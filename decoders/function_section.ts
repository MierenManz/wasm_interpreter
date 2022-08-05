import { decodeVarint } from "../deps.ts";
import { Decoded } from "../types/mod.ts";
import { consume } from "../util.ts";

export function decodeFunctionSection(
  bytes: Uint8Array,
  module: Decoded.Module,
) {
  if ((bytes[0] as number) !== 0x03) {
    console.log(bytes);
    throw new Error("Unexpected Section: Expected Function Section");
  }
  let count, [_, offset] = decodeVarint(bytes, 1);

  [count, offset] = decodeVarint(bytes, offset);
  consume(bytes, offset);

  for (let i = 0; i < count; i++) {
    let signatureIndex;
    [signatureIndex, offset] = decodeVarint(bytes);

    if (signatureIndex >= module.typeSection.length) {
      throw new Error("Invalid signature index");
    }

    module.functionSection.push(signatureIndex);
    consume(bytes, offset);
  }
}
