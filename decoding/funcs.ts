import { varintDecode } from "./varint.ts";
import type { DecodedModule } from "../types/module/decoded.ts";

export function decodeFuncSection(module: DecodedModule, bytes: Uint8Array) {
  const [count, offset] = varintDecode(bytes);

  bytes = bytes.subarray(offset);

  for (let i = 0; i < count; i++) {
    const [value, bytesConsumed] = varintDecode(bytes);

    module.funcs.push(value);
    bytes = bytes.subarray(bytesConsumed);
  }
}
