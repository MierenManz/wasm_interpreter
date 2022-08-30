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
      locals.map((x) => `{ value: 0, kind: "${x}" }`)
    }],
        result: [${result}],
        cfStack: [],
      };

      interpret(mod, new Reader(instructions), context);
      if (context.stack.length === 0) return context.stack[0].value;
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
