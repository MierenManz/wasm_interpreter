import { EXTERNAL_KIND } from "../util/misc.ts";
import { decodeVarint } from "../util/varint.ts";
import { decodeIdentifier } from "./misc.ts";
import type { Decoded } from "../types/mod.ts";
import type { Reader } from "../util/reader.ts";

export function decodeExport(reader: Reader): Decoded.Export {
  const exportName = decodeIdentifier(reader);
  const kind = EXTERNAL_KIND[reader.readUint8()];
  if (kind === undefined) throw new Error("Invalid external kind");

  return { exportName, kind, spaceIndex: decodeVarint(reader) };
}
