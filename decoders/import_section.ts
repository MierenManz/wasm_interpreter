import { decodeVarint } from "../util/varint.ts";
import {
  decodeGlobalDescriptor,
  decodeIdentifier,
  decodeResizableLimits,
} from "./misc.ts";
import { decodeTable } from "./table_section.ts";
import { EXTERNAL_KIND } from "../util/misc.ts";
import type { Import } from "../types/decoded.ts";
import type { Reader } from "../util/reader.ts";

export function decodeImport(reader: Reader): Import {
  const moduleName = decodeIdentifier(reader);
  const exportName = decodeIdentifier(reader);

  const kind = EXTERNAL_KIND[reader.readUint8()];
  if (kind === undefined) throw new Error("Invalid external kind");

  switch (kind) {
    case "func":
      return {
        moduleName,
        exportName,
        kind,
        signatureIndex: decodeVarint(reader),
      };
    case "table":
    case "memory":
      return {
        moduleName,
        exportName,
        kind,
        descriptor: kind === "table"
          ? decodeTable(reader)
          : decodeResizableLimits(reader),
      };

    case "global":
      return {
        moduleName,
        exportName,
        kind,
        descriptor: decodeGlobalDescriptor(reader),
      };
  }
}
