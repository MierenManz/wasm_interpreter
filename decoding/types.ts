import { varintDecode } from "./varint.ts";
import { VAL_TYPES } from "./util.ts";
import type { Result, ValType } from "../types/common.ts";
import type { DecodedModule } from "../types/module/decoded.ts";

function decodeParameters(bytes: Uint8Array): Result<ValType[]> {
  const [paramCount, paramOffset] = varintDecode(bytes);
  const params = new Array(paramCount);

  for (let i = 0; i < paramCount; i++) {
    const param = VAL_TYPES[bytes[paramOffset + i]];
    if (!param) throw new Error("Unknown Valtype");

    params[i] = param;
  }

  return {
    value: params,
    bytesConsumed: paramOffset + paramCount,
  };
}

export function decodeTypeSection(module: DecodedModule, bytes: Uint8Array) {
  const [count, offset] = varintDecode(bytes);

  bytes = bytes.subarray(offset);

  for (let i = 0; i < count; i++) {
    const signature = bytes[0];
    if (signature !== 0x60) throw new Error("Unknown type signature");
    bytes = bytes.subarray(1);

    const params = decodeParameters(bytes);
    bytes = bytes.subarray(params.bytesConsumed);

    const results = decodeParameters(bytes);
    bytes = bytes.subarray(results.bytesConsumed);

    module.types.push({ params: params.value, result: results.value });
  }
}
