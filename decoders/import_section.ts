import { decodeVarint } from "../util/varint.ts";
import { decodeGlobalDescriptor, decodeResizableLimits } from "./misc.ts";
import type { Import } from "../types/decoded.ts";
import type { Reader } from "../util/reader.ts";
import { decodeTable } from "./table_section.ts";

const KIND = ["func", "table", "memory", "global"] as const;

export function decodeImport(reader: Reader): Import {
  const moduleNameLength = decodeVarint(reader);
  const moduleName = reader.readString(moduleNameLength);
  const exportNameLength = decodeVarint(reader);
  const exportName = reader.readString(exportNameLength);

  const kind = KIND[reader.readUint8()];
  if (kind === undefined) throw new Error("Invalid import kind");

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
