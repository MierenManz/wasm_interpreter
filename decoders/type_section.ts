import { decodeVarint } from "../deps.ts";
import { Decoded } from "../types/mod.ts";
import { BYTE_TO_KIND, consume } from "../util.ts";

function decodeSignature(bytes: Uint8Array): Decoded.FunctionSignature {
  let [paramCount, offset] = decodeVarint(bytes);
  const signature: Decoded.FunctionSignature = {
    params: [],
    result: [],
  };

  for (let i = 0; i < paramCount; i++) {
    const byte = bytes[offset + i];
    const kind = BYTE_TO_KIND[byte];
    if (!kind) throw new Error("Invalid Type Signature");
    signature.params.push(kind);
  }

  let resultCount;
  [resultCount, offset] = decodeVarint(bytes, offset + paramCount);
  for (let i = 0; i < resultCount; i++) {
    const byte = bytes[offset + i];
    const kind = BYTE_TO_KIND[byte];
    if (!kind) throw new Error("Invalid Type Signature");
    signature.result.push(kind);
  }

  // Consumed the bytes that have been used
  consume(bytes, offset + 1);

  return signature;
}

export function decodeTypeSection(bytes: Uint8Array, module: Decoded.Module) {
  if ((bytes[0] as number) !== 0x01) {
    throw new Error("Unexpected Section: Expected Type Section");
  }
  let count, [_, offset] = decodeVarint(bytes, 1);

  [count, offset] = decodeVarint(bytes, offset);
  consume(bytes, offset);

  for (let i = 0; i < count; i++) {
    if (bytes[0] !== 0x60) throw new Error("Invalid Signature");
    consume(bytes, 1);
    module.typeSection.push(decodeSignature(bytes));
  }
}
