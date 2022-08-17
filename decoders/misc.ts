import { VALUE_KIND } from "../util/misc.ts";
import { decodeVarint } from "../util/varint.ts";
import type { Reader } from "../util/reader.ts";
import type {
  GlobalDescriptor,
  ResizableLimits,
  ValueKind,
} from "../types/common.ts";

export function decodeArray<T>(
  reader: Reader,
  predicate: (reader: Reader) => T,
): T[] {
  const length = decodeVarint(reader);
  const array: T[] = [];

  array.length = length;

  for (let i = 0; i < length; i++) {
    array[i] = predicate(reader);
  }

  return array;
}

export function decodeValue(reader: Reader): ValueKind {
  const kind = VALUE_KIND[reader.readUint8()];
  if (!kind) throw new Error("Invalid type signature");
  return kind;
}

export function decodeResizableLimits(reader: Reader): ResizableLimits {
  const flags = decodeVarint(reader);
  const min = decodeVarint(reader);

  if (flags !== 0x00 && flags !== 0x01) throw new Error("Invalid Flags");

  if (flags === 0x01) {
    const max = decodeVarint(reader);
    if (max < min) throw new Error("Max size should be greater or equal");

    return { min, max };
  }

  return { min };
}

export function decodeGlobalDescriptor(reader: Reader): GlobalDescriptor {
  const kind = decodeValue(reader);
  const isMutByte = reader.readUint8();

  if (isMutByte !== 0x00 && isMutByte !== 0x01) {
    throw new Error("Invalid byte. Unknown mutability state");
  }

  return {
    kind: kind,
    mutable: isMutByte === 0x01,
  };
}

export function decodeIdentifier(reader: Reader): string {
  return reader.readString(decodeVarint(reader));
}
