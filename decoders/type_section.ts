import { decodeArray, decodeValue } from "./misc.ts";
import type { FunctionSignature } from "../types/decoded.ts";
import type { Reader } from "../util/reader.ts";

export function decodeSignature(reader: Reader): FunctionSignature {
  if (reader.readUint8() !== 0x60) {
    throw new Error("Invalid Function Signature");
  }

  return {
    params: decodeArray(reader, decodeValue),
    result: decodeArray(reader, decodeValue),
  };
}
