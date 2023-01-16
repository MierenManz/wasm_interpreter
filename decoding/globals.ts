import { varintDecode, varlongDecode } from "./varint.ts";
import { VAL_TYPES } from "./util.ts";
import type { Result } from "../types/common.ts";
import type { DecodedGlobal, DecodedModule } from "../types/module/decoded.ts";

const INSTR_TO_INITIAL: Record<
  number,
  (bytes: Uint8Array) => [number | bigint, number]
> = {
  0x41: varintDecode,
  0x42: varlongDecode,
  0x43: (b) => [new DataView(b.buffer, b.byteOffset, 4).getFloat32(0, true), 4],
  0x44: (b) => [new DataView(b.buffer, b.byteOffset, 8).getFloat64(0, true), 8],
};

function decodeGlobal(bytes: Uint8Array): Result<DecodedGlobal> {
  const valtype = VAL_TYPES[bytes[0]];
  if (!valtype) throw new Error("Unknown Value Type");
  const mutable = bytes[1] === 1;
  const initialResolver = INSTR_TO_INITIAL[bytes[2]];
  if (!initialResolver) throw new Error("Unknown Initial expression");

  const [initial, bytesConsumed] = initialResolver(bytes.subarray(3));
  return {
    value: { valtype, mutable, initial } as DecodedGlobal,
    bytesConsumed: bytesConsumed + 3,
  };
}

export function decodeGlobalSection(module: DecodedModule, bytes: Uint8Array) {
  const [count, offset] = varintDecode(bytes);

  bytes = bytes.subarray(offset);

  for (let i = 0; i < count; i++) {
    const result = decodeGlobal(bytes);
    module.globals.push(result.value);
    bytes = bytes.subarray(result.bytesConsumed);
  }
}
