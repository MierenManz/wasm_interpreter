import { decodeVarint } from "./varint.ts";
import { Reader } from "./reader.ts";

export enum SectionKind {
  TypeSection = 0x01,
  ImportSection = 0x02,
  FunctionSection = 0x03,
  TableSection = 0x04,
  MemorySection = 0x05,
  GlobalSection = 0x06,
  ExportSection = 0x07,
  StartSection = 0x08,
  ElementSection = 0x09,
  CodeSection = 0x0A,
  DataSection = 0x0B,
}

interface Section {
  kind: SectionKind;
  reader: Reader;
}

export function parseSection(reader: Reader): Section {
  const kind = reader.readUint8();
  return {
    kind,
    reader: new Reader(reader.readSlice(decodeVarint(reader))),
  };
}
