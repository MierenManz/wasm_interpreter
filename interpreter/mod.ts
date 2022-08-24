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
  0x71: I32.and,
  0x72: I32.or,
  0x73: I32.xor,
  0x74: I32.shl,
  0x75: I32.shrS,
  0x76: I32.shrU,
  0x77: I32.rotl,
  0x41: I32.const,
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
    const op = reader.readUint8();
    const instructionCall = instructions[op];
    if (instructionCall === undefined) {
      throw new Error("Unknown instruction: 0x" + op.toString(16));
    }
    stop = !!instructionCall(module, reader, context);
  }
}
