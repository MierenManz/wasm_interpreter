import { varintDecode } from "./varint.ts";
import { decodeString } from "./util.ts";
import { DecodingError, ValidationError } from "../error.ts";
import type { Result } from "../types/common.ts";
import type {
  DecodedExport,
  DecodedModule,
  ExternalKind,
} from "../types/module/decoded.ts";

const BYTE_TO_EXTERNAL_KIND: ExternalKind[] = [
  "func",
  "table",
  "memory",
  "global",
];

const EXTERNAL_KIND_VALIDATOR: Record<
  ExternalKind,
  (module: DecodedModule, e: DecodedExport) => boolean
> = {
  func: (module, exp) => exp.index < module.funcs.length,
  table: (module, exp) => exp.index < module.tables.length,
  memory: (module, _exp) => !!module.memory,
  global: (module, exp) => exp.index < module.globals.length,
};

function decodeExport(bytes: Uint8Array): Result<DecodedExport> {
  const name = decodeString(bytes);
  const kind = BYTE_TO_EXTERNAL_KIND[bytes[name.bytesConsumed]];

  bytes = bytes.subarray(name.bytesConsumed + 1);

  if (!kind) throw new DecodingError("Unknown External kind");

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
    const { value, bytesConsumed } = decodeExport(bytes);

    if (module.exports.some((e) => e.exportName === value.exportName)) {
      throw new ValidationError("Duplicate export name");
    }

    const isValid = EXTERNAL_KIND_VALIDATOR[value.kind];
    if (!isValid(module, value)) {
      throw new ValidationError("Index out of bound");
    }

    module.exports.push(value);
    bytes = bytes.subarray(bytesConsumed);
  }
}
