import type { BasicIdent, MemoryArg } from "../common.ts";

export type I32Load = BasicIdent<"i32.load"> & MemoryArg;
export type I64Load = BasicIdent<"i64.load"> & MemoryArg;
export type F32Load = BasicIdent<"f32.load"> & MemoryArg;
export type F64Load = BasicIdent<"f64.load"> & MemoryArg;

export type I32Load8S = BasicIdent<"i32.load8_s"> & MemoryArg;
export type I32Load8U = BasicIdent<"i32.load8_u"> & MemoryArg;
export type I32Load16S = BasicIdent<"i32.load16_s"> & MemoryArg;
export type I32Load16U = BasicIdent<"i32.load16_u"> & MemoryArg;

export type I64Load8S = BasicIdent<"i64.load8_s"> & MemoryArg;
export type I64Load8U = BasicIdent<"i64.load8_u"> & MemoryArg;
export type I64Load16S = BasicIdent<"i64.load16_s"> & MemoryArg;
export type I64Load16U = BasicIdent<"i64.load16_u"> & MemoryArg;
export type I64Load32S = BasicIdent<"i64.load32_s"> & MemoryArg;
export type I64Load32U = BasicIdent<"i64.load32_u"> & MemoryArg;

export type I32Store = BasicIdent<"i32.store"> & MemoryArg;
export type I64Store = BasicIdent<"i64.store"> & MemoryArg;
export type F32Store = BasicIdent<"f32.store"> & MemoryArg;
export type F64Store = BasicIdent<"f64.store"> & MemoryArg;

export type I32Store8 = BasicIdent<"i32.store8"> & MemoryArg;
export type I32Store16 = BasicIdent<"i32.store16"> & MemoryArg;

export type I64Store8 = BasicIdent<"i64.store8"> & MemoryArg;
export type I64Store16 = BasicIdent<"i64.store16"> & MemoryArg;
export type I64Store32 = BasicIdent<"i64.store32"> & MemoryArg;

export type MemorySize = BasicIdent<"memory.size">;
export type MemoryGrow = BasicIdent<"memory.grow">;

export interface MemoryInit {
  kind: "memory.init";
  dataIndex: number;
}
export interface DataDrop {
  kind: "data.drop";
  dataIndex: number;
}

export type MemoryCopy = BasicIdent<"memory.copy">;
export type MemoryFill = BasicIdent<"memory.fill">;

export type MemoryInstruction =
  | I32Load
  | I64Load
  | F32Load
  | F64Load
  | I32Load8S
  | I32Load8U
  | I32Load16S
  | I32Load16U
  | I64Load8S
  | I64Load8U
  | I64Load16S
  | I64Load16U
  | I64Load32S
  | I64Load32U
  | I32Store
  | I64Store
  | F32Store
  | F64Store
  | I32Store8
  | I32Store16
  | I64Store8
  | I64Store16
  | I64Store32
  | MemorySize
  | MemoryGrow
  | MemoryInit
  | DataDrop
  | MemoryCopy
  | MemoryFill;
