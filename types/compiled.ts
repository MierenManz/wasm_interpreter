import { ValueKind } from "./common.ts";

interface BigIntValue {
  kind: "i64";
  inner: bigint;
}

interface NumberValue {
  kind: Omit<ValueKind, "i64">;
  inner: number;
}

export type Value = BigIntValue | NumberValue;

export interface Func {
  params: Value[];
  result: ValueKind[];
  locals: Value[];
  stack: Value[];
  instructions: Uint8Array;
}

export interface Module {
  functionSpace: Func[];
}
