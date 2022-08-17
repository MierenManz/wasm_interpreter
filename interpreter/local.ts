import { decodeVarint } from "../util/varint.ts";

import type { Compiled } from "../types/mod.ts";
import type { Reader } from "../util/reader.ts";

export function get(
  _module: Compiled.Module,
  reader: Reader,
  context: Compiled.FunctionContext,
) {
  const ptr = decodeVarint(reader);
  if (ptr >= context.locals.length || ptr < 0) {
    throw new RangeError("Invalid Index");
  }

  // Reference
  const val = context.locals[ptr];
  // Deep copy to push onto the stack
  context.stack.push(structuredClone(val));
}
