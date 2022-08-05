import { ValueKind } from "./types/common.ts";
export function consume(bytes: Uint8Array, length: number) {
  bytes.copyWithin(0, length);
  bytes.fill(0, bytes.length - length);
}

export const BYTE_TO_KIND: Record<number, ValueKind> = {
  0x7F: "i32",
  0x7E: "i64",
  0x7D: "f32",
  0x7C: "f64",
};
