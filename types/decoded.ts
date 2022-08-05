import { ValueKind } from "./common.ts";

export interface FunctionSignature {
  params: ValueKind[];
  result: ValueKind[];
}

export interface CodeBody {
  locals: ValueKind[];
  instructions: Uint8Array;
}

export interface Module {
  typeSection: FunctionSignature[];
  // importSection:
  functionSection: number[];
  // tableSection:
  // memorySection:
  // globalSection:
  // exportSection:
  // startSection:
  // elementSection:
  codeSection: CodeBody[];
  // dataSection:
}
