import { Reader } from "./util/reader.ts";
import { parseSection } from "./util/section.ts";

import type { Compiled, Decoded } from "./types/mod.ts";
import { decodeArray, decodeResizableLimits } from "./decoders/misc.ts";
import { decodeSignature } from "./decoders/type_section.ts";
import { decodeImport } from "./decoders/import_section.ts";
import { decodeVarint } from "./util/varint.ts";
import { decodeFnBody } from "./decoders/code_section.ts";
import { decodeTable } from "./decoders/table_section.ts";

const KIND_TO_DECODER: Record<
  number,
  (reader: Reader, module: Decoded.Module) => void
> = {
  0x01: (reader, mod) => mod.typeSection = decodeArray(reader, decodeSignature),
  0x02: (reader, mod) => mod.importSection = decodeArray(reader, decodeImport),
  0x03: (reader, mod) =>
    mod.functionSection = decodeArray(reader, decodeVarint),
  0x04: (reader, mod) => mod.tableSection = decodeArray(reader, decodeTable),
  0x05: (reader, mod) =>
    mod.memorySection = decodeArray(reader, decodeResizableLimits),
  // 0x06: "globalSection",
  // 0x07: "exportSection",
  // 0x08: "startSection",
  // 0x09: "elementSection",
  0x0A: (reader, mod) => mod.codeSection = decodeArray(reader, decodeFnBody),
  // 0x0B: "dataSection",
};

function decodeModule(reader: Reader): Decoded.Module {
  const decodedModule: Decoded.Module = {
    typeSection: [],
    importSection: [],
    functionSection: [],
    tableSection: [],
    memorySection: [],
    globalSection: [],
    exportSection: [],
    startSection: null,
    elementSection: [],
    codeSection: [],
    dataSection: [],
  };

  let lastSection = 0;
  for (let i = 0; i < 11; i++) {
    if (reader.isConsumed()) break;

    const { kind, reader: sectionReader } = parseSection(reader);

    if (lastSection >= kind) throw new Error("Sections out of order");
    lastSection = kind;

    const decoder = KIND_TO_DECODER[kind];
    if (decoder === undefined) throw new Error("Unknown Section");
    decoder(sectionReader, decodedModule);
  }

  return decodedModule;
}

export function instanciateModule(
  bytes: Uint8Array,
  _imports: WebAssembly.Imports,
): Decoded.Module {
  const reader = new Reader(bytes);

  if (reader.readUint32(true) !== 0x6D736100) {
    throw new Error("Bad Magic cookie");
  }

  if (reader.readUint32(true) !== 1) {
    throw new Error("Incompatible wasm binary");
  }

  const decodedModule = decodeModule(reader);

  const _compiledModule: Compiled.Module = {
    functionSpace: [],
    // globalSpace: [],
    // memorySpace: [],
    // tableSpace: [],
  };

  // compileFunctionSpace(decodedModule, compiledModule);
  // compileGlobalSpace(decodedModule, compiledModule);
  // compileMemorySpace(decodedModule, compiledModule);
  // compileTableSpace(decodedModule, compiledModule);

  return decodedModule;
}
