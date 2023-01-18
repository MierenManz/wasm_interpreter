export type BasicIdent<N extends string> = { kind: N };
export type MemoryArg = { align: number; offset: number };

export type NumType = "i32" | "i64" | "f32" | "f64";
export type RefType = "funcref" | "externref";
export type VecType = "v128";

export type ValType = NumType | RefType; // | VecType;

export interface BlockType {
  params: ValType[];
  result: ValType[];
}

export type Result<T> = { value: T; bytesConsumed: number };
