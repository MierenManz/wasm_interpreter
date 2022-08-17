import type { ValueKind } from "./common.ts";

interface NumberValue {
  kind: Exclude<ValueKind, "i64">;
  value: number;
}

export type Value = NumberValue;

export interface FunctionContext {
  stack: Value[];
  locals: Value[];
  result: ValueKind[];
  cfStack: number[];
}

export interface Func {
  instructions: Uint8Array;
  callable: CallableFunction;
}

export interface Module {
  funcSpace: Func[];
  // globalSpace: Global[];
  // memorySpace: Memory[];
  // tableSpace: Table[];
}
