import { decode32 } from "../deps.ts";
import type { DecodedModule } from "../types/module/decoded.ts";

export function decodeFuncSection(module: DecodedModule, bytes: Uint8Array) {
  const [count, offset] = decode32(bytes);

  bytes = bytes.subarray(offset);

  for (let i = 0; i < count; i++) {
    const [value, bytesConsumed] = decode32(bytes);

    module.funcs.push(value);
    bytes = bytes.subarray(bytesConsumed);
  }
}
