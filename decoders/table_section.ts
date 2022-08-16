import { decodeResizableLimits } from "./misc.ts";
import type { ResizableLimits } from "../types/common.ts";
import type { Reader } from "../util/reader.ts";

export function decodeTable(reader: Reader): ResizableLimits {
  if (reader.readUint8() !== 0x70) throw new Error("Invalid Signature");
  return decodeResizableLimits(reader);
}
