import type { Result } from "../types/common.ts";
import type {
  DecodedExport,
  DecodedModule,
  ExternalKind,
} from "../types/module/decoded.ts";
import { varintDecode } from "./varint.ts";
import { decodeString } from "./util.ts";

const BYTE_TO_EXTERNAL_KIND: ExternalKind[] = [
  "func",
  "table",
  "memory",
  "global",
];

function decodeExport(bytes: Uint8Array): Result<DecodedExport> {
  const name = decodeString(bytes);
  const kind = BYTE_TO_EXTERNAL_KIND[bytes[name.bytesConsumed]];

  bytes = bytes.subarray(name.bytesConsumed + 1);

  if (!kind) throw new Error("Unknwon External kind");

  const [index, consumed] = varintDecode(bytes);

  return {
    value: {
      index,
      kind,
      exportName: name.value,
    },
    bytesConsumed: consumed + name.bytesConsumed + 1,
  };
}

export function decodeExportSection(module: DecodedModule, bytes: Uint8Array) {
  const [count, offset] = varintDecode(bytes);

  bytes = bytes.subarray(offset);

  for (let i = 0; i < count; i++) {
    const result = decodeExport(bytes);
    if (
      result.value.kind === "memory" &&
      (module.memory === null || result.value.index !== 0)
    ) {
      throw new Error("Cannot export undefined memory");
    }

    module.exports.push(result.value);
    bytes = bytes.subarray(result.bytesConsumed);
  }
}
