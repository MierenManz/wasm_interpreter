import { ValueKind } from "../types/common.ts";
import type { Compiled, Decoded } from "../types/mod.ts";
import type { Reader } from "../util/reader.ts";

type InterpreterFn = (
  mod: Compiled.Module,
  reader: Reader,
  context: Compiled.FunctionContext,
) => void;

type GeneratorFn = (
  mod: Compiled.Module,
  interpret: InterpreterFn,
  reader: typeof Reader,
) => CallableFunction;

function maybeTrunc(x: ValueKind): string {
  switch (x) {
    case "i32":
      return "| 0";
    case "i64":
      return "| 0n";
    default:
      return "";
  }
}

export function generateFunctions(
  decodedModule: Decoded.Module,
): GeneratorFn[] {
  const array: GeneratorFn[] = [];
  array.length = decodedModule.functionSection.length;
  for (let i = 0; i < array.length; i++) {
    const sigPtr = decodedModule.functionSection[i];
    const signature = decodedModule.typeSection[sigPtr];
    const { locals } = decodedModule.codeSection[i];

    const result = signature.result.map((x) => `"${x}"`);
    const paramsObjects = signature.params.map((x, i) =>
      `{value: p${i} ${maybeTrunc(x)}, kind: "${x}"}`
    );
    const params = signature.params.map((_, i) => `p${i}`);
    const typeCheck = params.map((x, i) =>
      `if (${x} === undefined) throw new Error("Got empty value at parameter ${i}")\nif (typeof ${x} === "bigint" && "${
        signature.params[i]
      }" !== "i64") throw new Error("expected: ${
        signature.params[i]
      } but found i64")`
    );

    const body = `return function call(${params}) {
      ${typeCheck.join("\n")}
      const { instructions } = mod.funcSpace[${i}];
      const context = {
        stack: [],
        locals: [${paramsObjects},${
      locals.map((x) => `{ value: 0, kind: ${x} }`)
    }],
        result: [${result}],
        cfStack: [],
      };

      interpret(mod, new Reader(instructions), context);
      return context.stack.map(x => x.value);
    };`;
    const fn = new Function(
      "mod",
      "interpret",
      "Reader",
      body,
    );
    array[i] = fn as GeneratorFn;
  }

  return array;
}

const U32MAX = 0xFFFFFFFF;
const I32MAX = (U32MAX - 1) / 2;
const I32MIN = I32MAX - U32MAX;

const U64MAX = 0xFFFFFFFFFFFFFFFFn;
const I64MAX = (U64MAX - 1n) / 2n;
const I64MIN = I64MAX - U64MAX;

type OpFn = (
  module: Compiled.Module,
  reader: Reader,
  context: Compiled.FunctionContext,
) => void;

type MaybeSignedOp = "/" | "%";
type NormalOp =
  | "+"
  | "-"
  | "*"
  | "&"
  | "|"
  | "^"
  | ">>"
  | "<<"
  | ">>>";

type Op = MaybeSignedOp | NormalOp;

export function generateIntegerOperation(
  intKind: "i32" | "i64",
  op: MaybeSignedOp,
  signed: boolean,
): OpFn;
export function generateIntegerOperation(
  intKind: "i32" | "i64",
  op: NormalOp,
): OpFn;
export function generateIntegerOperation(
  intKind: "i32" | "i64",
  op: Op,
  signed = false,
): OpFn {
  const errorMessage =
    `Expected [${intKind}, ${intKind}], but found [\${a?.kind ?? "void"}, \${b?.kind ?? "void"}]`;
  const abs = signed ? "Math.abs" : "";
  const operation = `${abs}(${abs}(a.value) ${op} ${abs}(b.value))`;
  const MIN = intKind === "i32" ? I32MIN : (I64MIN.toString() + "n");
  const MAX = intKind === "i32" ? I32MAX : (I64MAX.toString() + "n");
  const body = `
    const a = context.stack.pop();
    const b = context.stack.pop();
    if (!a || !b || a.kind !== "${intKind}" || b.kind !== "${intKind}") {
      throw new Error(\`${errorMessage}\`)
    }

    const val = ${operation};
    if (val < (${MIN})) throw new RangeError("Byte underflow");
    if (val > ${MAX}) throw new RangeError("Byte overflow");
    context.stack.push({ kind: "${intKind}", value: val });
  `;

  return new Function("module", "reader", "context", body) as OpFn;
}
