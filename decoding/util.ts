import { varintDecode } from "./varint.ts";
import { ValidationError } from "../error.ts";
import type { Result, ValType } from "../types/common.ts";
import type { ResizableLimits } from "../types/module/decoded.ts";

export const TEXT_DECODER = new TextDecoder();
export const VAL_TYPES: Record<number, ValType> = {
  0x7F: "i32",
  0x7E: "i64",
  0x7D: "f32",
  0x7C: "f64",
  // 0x7B: "v128",
  0x70: "funcref",
  0x6F: "externref",
};

export function decodeResizableLimits(
  bytes: Uint8Array,
): Result<ResizableLimits> {
  const bitfield = bytes[0];
  const [min, bytesUsed] = varintDecode(bytes.subarray(1));
  bytes = bytes.subarray(bytesUsed + 1);

  const result: Result<ResizableLimits> = {
    value: { min: min },
    bytesConsumed: 1 + bytesUsed,
  };

  if (bitfield === 1) {
    const [max, bytesUsed] = varintDecode(bytes);
    if (max < min) throw new ValidationError("Max cannot be smaller than minimum");
    result.value.max = max;
    result.bytesConsumed += bytesUsed;
  }

  return result;
}

export function decodeString(bytes: Uint8Array): Result<string> {
  const [len, consumed] = varintDecode(bytes);

  return {
    value: TEXT_DECODER.decode(bytes.subarray(consumed, consumed + len)),
    bytesConsumed: len + consumed,
  };
}
