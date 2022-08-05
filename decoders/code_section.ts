import { decodeVarint } from "../deps.ts";
import { Common, Decoded } from "../types/mod.ts";
import { BYTE_TO_KIND, consume } from "../util.ts";

function decodeLocals(bytes: Uint8Array): Common.ValueKind[] {
  const array: Common.ValueKind[] = [];
  const [count, offset] = decodeVarint(bytes);
  for (let i = 0; i < count; i++) {
    const byte = bytes[offset + i];
    const kind = BYTE_TO_KIND[byte];
    if (!kind) throw new Error("Invalid Type Signature");
    array.push(kind);
  }
  consume(bytes, offset + count - 1);
  return array;
}

export function decodeCodeSection(
  bytes: Uint8Array,
  module: Decoded.Module,
) {
  if (bytes[0] !== 0x0A) {
    throw new Error("Unexpected Section: Expected Code Section");
  }
  let count, [_, offset] = decodeVarint(bytes, 1);

  [count, offset] = decodeVarint(bytes, offset);
  consume(bytes, offset);

  for (let i = 0; i < count; i++) {
    let bodySize;
    [bodySize, offset] = decodeVarint(bytes);
    const [localSize, bytesUsed] = decodeVarint(bytes, offset);
    consume(bytes, offset);

    const locals = decodeLocals(bytes);
    const codeBody: Decoded.CodeBody = {
      locals,
      instructions: bytes.slice(1, bodySize - (localSize + bytesUsed) + 1),
    };

    module.codeSection.push(codeBody);
  }
  consume(bytes, offset);
}
