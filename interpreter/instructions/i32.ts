import { generateIntegerOperation } from "../../codegen/integer.ts";
import { decodeSignedVarint } from "../../util/varint.ts";
import type { Compiled } from "../../types/mod.ts";
import type { Reader } from "../../util/reader.ts";

export const add = generateIntegerOperation("i32", "+");
export const sub = generateIntegerOperation("i32", "-");
export const mul = generateIntegerOperation("i32", "*");
export const divS = generateIntegerOperation("i32", "/", true);
export const divU = generateIntegerOperation("i32", "/", false);
export const remS = generateIntegerOperation("i32", "%", true);
export const remU = generateIntegerOperation("i32", "%", false);
export const and = generateIntegerOperation("i32", "&");
export const or = generateIntegerOperation("i32", "|");
export const xor = generateIntegerOperation("i32", "^");
export const shl = generateIntegerOperation("i32", "<<");
export const shrS = generateIntegerOperation("i32", ">>", true);
export const shrU = generateIntegerOperation("i32", ">>", false);

function constant(
  _module: Compiled.Module,
  reader: Reader,
  context: Compiled.FunctionContext,
) {
  context.stack.push({ kind: "i32", value: decodeSignedVarint(reader) });
}

export { constant as const };
