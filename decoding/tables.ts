import { varintDecode } from "./varint.ts";
import { decodeResizableLimits } from "./util.ts";
import { DecodingError } from "../error.ts";
import type { RefType, Result } from "../types/common.ts";
import type { DecodedModule, DecodedTable } from "../types/module/decoded.ts";

const REF_TYPE: Record<number, RefType> = {
  0x70: "funcref",
  0x6F: "externref",
};

function decodeTable(bytes: Uint8Array): Result<DecodedTable> {
  const refType = REF_TYPE[bytes[0]];
  if (!refType) throw new DecodingError("Unknown Reference Type");

  const limits = decodeResizableLimits(bytes.subarray(1));

  return {
    value: { reftype: refType, limits: limits.value },
    bytesConsumed: limits.bytesConsumed + 1,
  };
}

export function decodeTableSection(module: DecodedModule, bytes: Uint8Array) {
  const [count, offset] = varintDecode(bytes);

  bytes = bytes.subarray(offset);

  for (let i = 0; i < count; i++) {
    const result = decodeTable(bytes);
    module.tables.push(result.value);
    bytes = bytes.subarray(result.bytesConsumed);
  }
}
