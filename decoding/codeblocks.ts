import { decode32 } from "../deps.ts";
import type { Result, ValType } from "../types/common.ts";
import type { Instruction } from "../types/instructions/mod.ts";
import type { DecodedModule, DecodedCodeBlock } from "../types/module/decoded.ts";

function decodeLocals(bytes: Uint8Array): ValType[] {throw ""}

function decodeInstructions(bytes: Uint8Array): Instruction[] {throw ""}

function decodeCodeBlock(bytes: Uint8Array): Result<DecodedCodeBlock> {throw ""}

export function decodeCodeSection(module: DecodedModule, bytes: Uint8Array) {
  const [count, offset] = decode32(bytes);

  bytes = bytes.subarray(offset);

  for (let i = 0; i < count; i++) {

  }
}