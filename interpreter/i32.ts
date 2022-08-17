import type { Compiled } from "../types/mod.ts";
import type { Reader } from "../util/reader.ts";

export function add(
  _module: Compiled.Module,
  _reader: Reader,
  context: Compiled.FunctionContext,
) {
  const a = context.stack.pop();
  const b = context.stack.pop();
  if (!a || !b) throw new Error("Expected i32. Found void");
  if (a.kind !== "i32" || b.kind !== "i32") {
    throw new Error(`Expected [i32, i32]. Found [${a.kind}, ${b.kind}]`);
  }

  const res: Compiled.Value = { kind: "i32", value: a.value + b.value };
  context.stack.push(res);
}
