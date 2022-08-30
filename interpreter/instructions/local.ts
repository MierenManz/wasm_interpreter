import { decodeVarint } from "../../util/varint.ts";

import type { Compiled } from "../../types/mod.ts";
import type { Reader } from "../../util/reader.ts";

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
  context.stack.push({ kind: val.kind, value: val.value });
}

export function set(
  _module: Compiled.Module,
  reader: Reader,
  context: Compiled.FunctionContext,
) {
  const ptr = decodeVarint(reader);
  if (ptr >= context.locals.length || ptr < 0) {
    throw new RangeError("Invalid Index");
  }
  const local = context.locals[ptr];

  const v = context.stack.pop();
  if (!v || v.kind !== local.kind) {
    throw new TypeError(
      `Expected Type ${local.kind}, Found ${v?.kind ?? "void"}`,
    );
  }

  // Set value of local to value of v
  context.locals[ptr].value = v.value;
}

export function tee(
  _module: Compiled.Module,
  reader: Reader,
  context: Compiled.FunctionContext,
) {
  const ptr = decodeVarint(reader);
  if (ptr >= context.locals.length || ptr < 0) {
    throw new RangeError("Invalid Index");
  }
  const local = context.locals[ptr];

  // v is a Reference. It's still on the stack
  const v = context.stack[context.stack.length];
  if (!v || v.kind !== local.kind) {
    throw new TypeError(
      `Expected Type ${local.kind}, Found ${v?.kind ?? "void"}`,
    );
  }

  // Safe to do because `v.value` is copied by value, not by reference;
  local.value = v.value;
}
