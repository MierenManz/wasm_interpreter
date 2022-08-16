import type { Reader } from "./reader.ts";

const SEGMENT_BITS = 0x7F;
const CONTINUE_BIT = 0x80;

export function decodeVarint(reader: Reader): number {
  let currentByte = 0, value = 0, position = 0;
  while (true) {
    currentByte = reader.readUint8();
    value |= (currentByte & SEGMENT_BITS) << position;
    if ((currentByte & CONTINUE_BIT) === 0) break;

    position += 7;
    if (position >= 32) throw new RangeError("VarInt is too big");
  }

  return value;
}
