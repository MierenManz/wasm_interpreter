import { decodeResizableLimits } from "./util.ts";
import type { DecodedModule } from "../types/module/decoded.ts";

export function decodeMemorySection(module: DecodedModule, bytes: Uint8Array) {
  const sectionLength = bytes[0];
  if (sectionLength > 1) throw new Error("Multiple memories not supported!");
  const result = decodeResizableLimits(bytes.subarray(1));
  module.memory = result.value;
}
