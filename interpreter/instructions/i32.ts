import {
  generateIntComparisonOp,
  generateIntegerArithmeticOp,
} from "../../codegen/integer.ts";
import { decodeSignedVarint } from "../../util/varint.ts";
import type { Compiled } from "../../types/mod.ts";
import type { Reader } from "../../util/reader.ts";

const U32MAX = 0xFFFFFFFF;
const I32MAX = (U32MAX - 1) / 2;
const I32MIN = I32MAX - U32MAX;

// Arithmetic Operations
export const add = generateIntegerArithmeticOp("i32", "+");
export const sub = generateIntegerArithmeticOp("i32", "-");
export const mul = generateIntegerArithmeticOp("i32", "*");
export const divS = generateIntegerArithmeticOp("i32", "/", true);
export const divU = generateIntegerArithmeticOp("i32", "/", false);
export const remS = generateIntegerArithmeticOp("i32", "%", true);
export const remU = generateIntegerArithmeticOp("i32", "%", false);
export const and = generateIntegerArithmeticOp("i32", "&");
export const or = generateIntegerArithmeticOp("i32", "|");
export const xor = generateIntegerArithmeticOp("i32", "^");
export const shl = generateIntegerArithmeticOp("i32", "<<");
export const shrS = generateIntegerArithmeticOp("i32", ">>", true);
export const shrU = generateIntegerArithmeticOp("i32", ">>", false);
export function rotl(
  _module: Compiled.Module,
  _reader: Reader,
  context: Compiled.FunctionContext,
) {
  const a = context.stack.pop();
  const b = context.stack.pop();
  if (!a || !b || a.kind !== "i32" || b.kind !== "i32") {
    throw new Error(
      `Expected [i32, i32], but found [${a?.kind ?? "void"}, ${
        b?.kind ?? "void"
      }]`,
    );
  }

  // const valueA = a!.value;
  // const valueB = b!.value;
  // const highBits = valueA >>> (32 - valueB);
  // const lowBits = valueA << valueB;
  a.value = a.value << b.value | a.value >>> (32 - b.value);

  if (a.value < I32MIN) throw new RangeError("Byte underflow");
  if (a.value > I32MAX) throw new RangeError("Byte overflow");
  context.stack.push(a);
}
// export const rotl;
// export const rotr;
// export const clz;
// export const ctz;
// export const popcnt;
// export const eqz;

// Comparison Operations
export const eq = generateIntComparisonOp("i32", "==");
export const ne = generateIntComparisonOp("i32", "!=");
export const ltS = generateIntComparisonOp("i32", "<", true);
export const ltU = generateIntComparisonOp("i32", "<", false);
export const leS = generateIntComparisonOp("i32", "<=", true);
export const leU = generateIntComparisonOp("i32", "<=", false);
export const gtS = generateIntComparisonOp("i32", ">", true);
export const gtU = generateIntComparisonOp("i32", ">", false);
export const geS = generateIntComparisonOp("i32", ">=", true);
export const geU = generateIntComparisonOp("i32", ">=", false);

function constant(
  _module: Compiled.Module,
  reader: Reader,
  context: Compiled.FunctionContext,
) {
  context.stack.push({ kind: "i32", value: decodeSignedVarint(reader) });
}

export { constant as const };
