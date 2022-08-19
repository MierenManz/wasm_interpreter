import type { FunctionContext } from "../types/compiled.ts";
import type { Compiled } from "../types/mod.ts";
import type { Reader } from "../util/reader.ts";
import { decodeSignedVarint } from "../util/varint.ts";

const U32MAX = 0xFFFFFFFF;
const I32MAX = (U32MAX - 1) / 2;
const I32MIN = I32MAX - U32MAX;

export function add(
  _module: Compiled.Module,
  _reader: Reader,
  context: Compiled.FunctionContext,
) {
  const a = context.stack.pop();
  const b = context.stack.pop();
  if (!a || !b || a.kind !== "i32" || b.kind !== "i32") {
    throw new Error(
      `Expected [i32, i32]. Found [${a?.kind ?? "void"}, ${b?.kind ?? "void"}]`,
    );
  }

  const val = a.value + b.value;
  if (val < I32MIN) throw new RangeError("Byte underflow");
  if (val > I32MAX) throw new RangeError("Byte overflow");

  const res: Compiled.Value = { kind: "i32", value: val };
  context.stack.push(res);
}

export function sub(
  _module: Compiled.Module,
  _reader: Reader,
  context: Compiled.FunctionContext,
) {
  const a = context.stack.pop();
  const b = context.stack.pop();
  if (!a || !b || a.kind !== "i32" || b.kind !== "i32") {
    throw new Error(
      `Expected [i32, i32]. Found [${a?.kind ?? "void"}, ${b?.kind ?? "void"}]`,
    );
  }

  const val = a.value - b.value;
  if (val < I32MIN) throw new RangeError("Byte underflow");
  if (val > I32MAX) throw new RangeError("Byte overflow");

  const res: Compiled.Value = { kind: "i32", value: val };
  context.stack.push(res);
}

export function mul(
  _module: Compiled.Module,
  _reader: Reader,
  context: Compiled.FunctionContext,
) {
  const a = context.stack.pop();
  const b = context.stack.pop();
  if (!a || !b || a.kind !== "i32" || b.kind !== "i32") {
    throw new Error(
      `Expected [i32, i32]. Found [${a?.kind ?? "void"}, ${b?.kind ?? "void"}]`,
    );
  }

  const val = a.value * b.value;
  if (val < I32MIN) throw new RangeError("Byte underflow");
  if (val > I32MAX) throw new RangeError("Byte overflow");

  const res: Compiled.Value = { kind: "i32", value: val };
  context.stack.push(res);
}

export function div(
  _module: Compiled.Module,
  _reader: Reader,
  context: Compiled.FunctionContext,
) {
  const a = context.stack.pop();
  const b = context.stack.pop();
  if (!a || !b || a.kind !== "i32" || b.kind !== "i32") {
    throw new Error(
      `Expected [i32, i32], Found [${a?.kind ?? "void"}, ${b?.kind ?? "void"}]`,
    );
  }

  const val = Math.trunc(a.value / b.value);
  if (val < I32MIN) throw new RangeError("Byte underflow");
  if (val > I32MAX) throw new RangeError("Byte overflow");

  const res: Compiled.Value = { kind: "i32", value: val };
  context.stack.push(res);
}

function constant(
  _module: Compiled.Module,
  reader: Reader,
  context: FunctionContext,
) {
  context.stack.push({ kind: "i32", value: decodeSignedVarint(reader) });
}

export { constant as const };
