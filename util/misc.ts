import type { ValueKind } from "../types/common.ts";

export const BYTE_TO_KIND: Record<number, ValueKind> = {
  0x7F: "i32",
  0x7E: "i64",
  0x7D: "f32",
  0x7C: "f64",
};

export const TEXT_DECODER = new TextDecoder();
