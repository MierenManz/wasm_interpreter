import type {
  ExternalKind,
  GlobalDescriptor,
  ResizableLimits,
  ValueKind,
} from "./common.ts";

export interface FunctionSignature {
  params: ValueKind[];
  result: ValueKind[];
}

export interface FunctionBody {
  locals: ValueKind[];
  instructions: Uint8Array;
}

export interface ImportBase {
  moduleName: string;
  exportName: string;
}

interface FuncImport extends ImportBase {
  kind: "func";
  signatureIndex: number;
}

interface TableOrMemoryImport extends ImportBase {
  kind: "table" | "memory";
  descriptor: ResizableLimits;
}

interface GlobalImport extends ImportBase {
  kind: "global";
  descriptor: GlobalDescriptor;
}

export type Import = FuncImport | TableOrMemoryImport | GlobalImport;

export interface Export {
  kind: ExternalKind;
  spaceIndex: number;
  exportName: string;
}

export interface TableElement {
  tableIndex: number;
  offset: number;
  /** Function space indices */
  elements: number[];
}

export interface DataSlices {
  /** Should be 0 */
  memoryIndex: number;
  offset: number;
  slice: Uint8Array;
}

export interface Module {
  typeSection: FunctionSignature[];
  importSection: Import[];
  functionSection: number[];
  tableSection: ResizableLimits[];
  memorySection: ResizableLimits[];
  globalSection: GlobalDescriptor[];
  exportSection: Export[];
  startSection: number | null;
  elementSection: TableElement[];
  codeSection: FunctionBody[];
  dataSection: DataSlices[];
}
