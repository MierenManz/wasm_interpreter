import type { BasicIdent, BlockType, RefType, ValType } from "../common.ts";
import type { Instruction } from "../instructions/mod.ts";

export interface ResizableLimits {
  min: number;
  max?: number;
}

export interface DecodedTable {
  reftype: RefType;
  limits: ResizableLimits;
}

interface DecodedGlobalBase {
  mutable: boolean;
}

interface DecodedNumberGlobal {
  valtype: Exclude<ValType, "i64" | RefType>;
  initial: number;
}

interface DecodedBigintGlobal {
  valtype: "i64";
  initial: bigint;
}
interface DecodedRefGlobal {
  valtype: RefType;
  initial: number | null;
}

// interface DecodedVectorGlobal {
//   valtype: VecType;
//   initial: Uint8Array;
// }

export type DecodedGlobal =
  & (
    | DecodedNumberGlobal
    | DecodedBigintGlobal
    | DecodedRefGlobal
    // | DecodedVectorGlobal
  )
  & DecodedGlobalBase;

export interface ImportBase {
  namespace: string;
  externalName: string;
  kind: null;
}

interface DecodedFuncImport {
  kind: "func";
  fnIndex: number;
}

type DecodedTableImport = BasicIdent<"table"> & DecodedTable;

type DecodedMemoryImport = BasicIdent<"memory"> & ResizableLimits;

type DecodedGlobalImport = BasicIdent<"global"> & DecodedGlobal;

export type DecodedImport =
  & (
    | DecodedFuncImport
    | DecodedTableImport
    | DecodedMemoryImport
    | DecodedGlobalImport
  )
  & Exclude<ImportBase, "kind">;

export type ExternalKind = "func" | "table" | "memory" | "global";
export interface DecodedExport {
  kind: ExternalKind;
  index: number;
  exportName: string;
}

interface DecodedElementBase {
  initial: number[];
}

interface DecodedPassiveElement {
  mode: "passive";
}

/** Backing store for a table */
interface DecodedActiveElement {
  mode: "active";
  table: number;
  offset: number;
}

export type DecodedElement =
  & (DecodedPassiveElement | DecodedActiveElement)
  & DecodedElementBase;

export interface DecodedCodeBlock {
  locals: ValType[];
  instructions: Instruction;
}

interface DecodedPassiveDataSegment {
  mode: "passive";
}

interface DecodedActiveDataSegment {
  mode: "active";
  memory: number;
  offset: number;
}

type DecodedDataSegment =
  & (DecodedPassiveDataSegment | DecodedActiveDataSegment)
  & { initial: Uint8Array };

interface CustomSection {
  name: string;
  buff: Uint8Array;
}

export interface DecodedModule {
  customSection: CustomSection[];
  types: BlockType[];
  imports: DecodedImport[];
  funcs: number[];
  tables: DecodedTable[];
  memory: ResizableLimits | null;
  globals: DecodedGlobal[];
  exports: DecodedExport[];
  start: number | null;
  elements: DecodedElement[];
  codeblocks: DecodedCodeBlock[];
  dataSegments: DecodedDataSegment[];
}
