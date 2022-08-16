import type { ValueKind } from "./common.ts";

interface NumberValue {
  kind: Exclude<ValueKind, "i64">;
  value: number;
}

export type Value = NumberValue;

export interface FunctionResources {
  stack: Value[];
  locals: Value[];
  result: ValueKind[];
  params: Value[];
  cfStack: number[];
}

export interface Module {
  functionSpace: FunctionResources[];
  // globalSpace: Global[];
  // memorySpace: Memory[];
  // tableSpace: Table[];
}
