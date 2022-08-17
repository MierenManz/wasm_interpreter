import * as Local from "./local.ts";
import * as I32 from "./i32.ts";
import * as Misc from "./misc.ts";

import type { Compiled } from "../types/mod.ts";
import type { Reader } from "../util/reader.ts";

type Instructions = Record<
  number,
  (
    module: Compiled.Module,
    reader: Reader,
    context: Compiled.FunctionContext,
  ) => boolean | void
>;

const instructions: Instructions = {
  0x20: Local.get,
  0x6A: I32.add,
  0x0B: Misc.end,
};

export function interpret(
  module: Compiled.Module,
  reader: Reader,
  context: Compiled.FunctionContext,
) {
  let stop = false;
  while (!reader.isConsumed() && !stop) {
    const instructionCall = instructions[reader.readUint8()];
    if (instructionCall === undefined) throw new Error("Unknown instruction");
    stop = !!instructionCall(module, reader, context);
  }
}
