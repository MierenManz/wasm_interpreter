import {
  generateIntComparisonOp,
  generateIntegerArithmeticOp,
} from "../../codegen/integer.ts";
import { decodeSignedVarint } from "../../util/varint.ts";
import type { Compiled } from "../../types/mod.ts";
import type { Reader } from "../../util/reader.ts";

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
