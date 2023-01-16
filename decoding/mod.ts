import { decodeCustomSection } from "./custom.ts";
import { decodeTypeSection } from "./types.ts";
import { decodeFuncSection } from "./funcs.ts";
import { decodeTableSection } from "./tables.ts";
import { varintDecode } from "./varint.ts";
import { decodeMemorySection } from "./memories.ts";
import type { DecodedModule } from "../types/module/decoded.ts";

const WASM_COOKIE = 0x6D736100;
const WASM_VERSION = 1;
const TODO_ERROR = new Error("TODO!");
type Decoder = (module: DecodedModule, bytes: Uint8Array) => void;

const DECODERS: Decoder[] = [
  decodeCustomSection,
  decodeTypeSection,
  /** Imports */
  () => {
    throw TODO_ERROR;
  },
  decodeFuncSection,
  /** Tables */
  decodeTableSection,
  /** Memory */
  decodeMemorySection,
  /** Globals */
  () => {
    // throw TODO_ERROR;
  },
  /** Exports */
  () => {
    // throw TODO_ERROR;
  },
  /** Start */
  () => {
    // throw TODO_ERROR;
  },
  /** Elements */
  () => {
    // throw TODO_ERROR;
  },
  /**  */
  () => {
    // throw TODO_ERROR;
  },
  () => {
    // throw TODO_ERROR;
  },
];

export function decodeModule(
  bytes: Uint8Array,
): DecodedModule {
  const buff = new Uint32Array(bytes.buffer, 0, 2);

  if (buff[0] !== WASM_COOKIE) throw new Error("Bad WASM Cookie");
  if (buff[1] !== WASM_VERSION) throw new Error("Unsupported Version");

  const module: DecodedModule = {
    customSection: [],
    types: [],
    imports: [],
    funcs: [],
    tables: [],
    memory: null,
    globals: [],
    exports: [],
    start: null,
    elements: [],
    codeblocks: [],
    dataSegments: [],
  };

  // Remove the wasm cookie and version
  bytes = bytes.subarray(8);

  for (let i = 0; i < 12; i++) {
    const sectionID = bytes[0];

    if (sectionID === undefined) break;

    bytes = bytes.subarray(1);

    // Section is custom. Does not count as a section
    if (sectionID === 0) i--;

    if (sectionID !== 0 && sectionID <= i) {
      throw new Error(`Unexpected section: ${sectionID}`);
    }

    const [sectionLength, sectionBase] = varintDecode(bytes);

    const sectionBytes = bytes.subarray(
      sectionBase,
      sectionBase + sectionLength,
    );
    bytes = bytes.subarray(sectionBase + sectionLength);

    const sectionDecoder = DECODERS[sectionID];
    // console.log(sectionID)
    // console.log(sectionDecoder);
    if (!sectionDecoder) throw new Error("Unknown section");

    sectionDecoder(module, sectionBytes);
  }

  return module;
}