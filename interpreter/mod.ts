import * as Local from "./instructions/local.ts";
import * as I32 from "./instructions/i32.ts";
import * as ControlFlow from "./instructions/control_flow.ts";

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
  // Local instructions
  0x20: Local.get,
  0x21: Local.set,
  0x22: Local.tee,

  // I32 instructions
  0x6A: I32.add,
  0x6B: I32.sub,
  0x6C: I32.mul,
  0x6D: I32.divS,
  0x6E: I32.divU,
  0x6F: I32.remS,
  0x70: I32.remU,

  // Control flow instructions
  0x0B: ControlFlow.end,
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
