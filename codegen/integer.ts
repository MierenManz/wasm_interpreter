import type { Compiled } from "../types/mod.ts";
import type { Reader } from "../util/reader.ts";

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

type MaybeSignedIntOp = "/" | "%" | ">>";
type NormalIntOp =
  | "+"
  | "-"
  | "*"
  | "&"
  | "|"
  | "^"
  | "<<";

type IntOp = MaybeSignedIntOp | NormalIntOp;
type Int = "i32" | "i64";

function generateVal(name: string, intKind: Int, signed: boolean): string {
  let value = `${name}.value`;
  if (!signed && intKind === "i32") value = `(${value} >>> 0)`;
  if (!signed && intKind === "i64") value = `(BigInt.asUintN(64, ${value}))`;
  return value;
}

// deno-fmt-ignore
export function generateIntegerOperation(intKind: Int, op: MaybeSignedIntOp, signed: boolean): OpFn;
export function generateIntegerOperation(intKind: Int, op: NormalIntOp): OpFn;
// deno-fmt-ignore
export function generateIntegerOperation(intKind: Int, op: IntOp, signed = false): OpFn {
  const errorMessage =
    `Expected [${intKind}, ${intKind}], but found [\${a?.kind ?? "void"}, \${b?.kind ?? "void"}]`;

  const valueA = generateVal("a", intKind, signed);
  const valueB = generateVal("b", intKind, signed);
  const MIN = intKind === "i32" ? I32MIN : (I64MIN.toString() + "n");
  const MAX = intKind === "i32" ? I32MAX : (I64MAX.toString() + "n");
  const body = `
    const a = context.stack.pop();
    const b = context.stack.pop();
    if (!a || !b || a.kind !== "${intKind}" || b.kind !== "${intKind}") {
      throw new Error(\`${errorMessage}\`)
    }

    const val = (${valueA} ${op} ${valueB});;
    if (val < (${MIN})) throw new RangeError("Byte underflow");
    if (val > ${MAX}) throw new RangeError("Byte overflow");
    context.stack.push({ kind: "${intKind}", value: val });
  `;

  return new Function("module", "reader", "context", body) as OpFn;
}
