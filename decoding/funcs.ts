import { varintDecode } from "./varint.ts";
import type { DecodedModule } from "../types/module/decoded.ts";
import type { Result } from "../types/common.ts";

export function decodeFnIndex(bytes: Uint8Array): Result<number> {
  const res = varintDecode(bytes);

  return {
    value: res[0],
    bytesConsumed: res[1],
  };
}

export function decodeFuncSection(module: DecodedModule, bytes: Uint8Array) {
  const [count, offset] = varintDecode(bytes);

  bytes = bytes.subarray(offset);

  for (let i = 0; i < count; i++) {
    const result = decodeFnIndex(bytes);

    module.funcs.push(result.value);
    bytes = bytes.subarray(result.bytesConsumed);
  }
}
