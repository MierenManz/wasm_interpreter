import type { BasicIdent } from "../common.ts";

export interface I32Const {
  kind: "i32.const";
  value: number;
}

export interface I64Const {
  kind: "i64.const";
  value: bigint;
}

export interface F32Const {
  kind: "f32.const";
  value: number;
}

export interface F64Const {
  kind: "f64.const";
  value: number;
}

export type I32Eqz = BasicIdent<"i32.eqz">;
export type I32Eq = BasicIdent<"i32.eq">;
export type I32Ne = BasicIdent<"i32.ne">;
export type I32LtS = BasicIdent<"i32.lt_s">;
export type I32LtU = BasicIdent<"i32.lt_u">;
export type I32GtS = BasicIdent<"i32.gt_s">;
export type I32GtU = BasicIdent<"i32.gt_u">;
export type I32LeS = BasicIdent<"i32.le_s">;
export type I32LeU = BasicIdent<"i32.le_u">;
export type I32GeS = BasicIdent<"i32.ge_s">;
export type I32GeU = BasicIdent<"i32.ge_u">;

export type I64Eqz = BasicIdent<"i64.eqz">;
export type I64Eq = BasicIdent<"i64.eq">;
export type I64Ne = BasicIdent<"i64.ne">;
export type I64LtS = BasicIdent<"i64.lt_s">;
export type I64LtU = BasicIdent<"i64.lt_u">;
export type I64GtS = BasicIdent<"i64.gt_s">;
export type I64GtU = BasicIdent<"i64.gt_u">;
export type I64LeS = BasicIdent<"i64.le_s">;
export type I64LeU = BasicIdent<"i64.le_u">;
export type I64GeS = BasicIdent<"i64.ge_s">;
export type I64GeU = BasicIdent<"i64.ge_u">;

export type F32Eq = BasicIdent<"f32.eq">;
export type F32Ne = BasicIdent<"f32.ne">;
export type F32Lt = BasicIdent<"f32.lt">;
export type F32Gt = BasicIdent<"f32.gt">;
export type F32Le = BasicIdent<"f32.le">;
export type F32Ge = BasicIdent<"f32.ge">;

export type F64Eq = BasicIdent<"f64.eq">;
export type F64Ne = BasicIdent<"f64.ne">;
export type F64Lt = BasicIdent<"f64.lt">;
export type F64Gt = BasicIdent<"f64.gt">;
export type F64Le = BasicIdent<"f64.le">;
export type F64Ge = BasicIdent<"f64.ge">;

export type I32Clz = BasicIdent<"i32.clz">;
export type I32Ctz = BasicIdent<"i32.ctz">;
export type I32PopCnt = BasicIdent<"i32.popcnt">;
export type I32Add = BasicIdent<"i32.add">;
export type I32Sub = BasicIdent<"i32.sub">;
export type I32Mul = BasicIdent<"i32.mul">;
export type I32DivS = BasicIdent<"i32.div_s">;
export type I32DivU = BasicIdent<"i32.div_u">;
export type I32RemS = BasicIdent<"i32.rem_s">;
export type I32RemU = BasicIdent<"i32.rem_u">;
export type I32And = BasicIdent<"i32.and">;
export type I32Or = BasicIdent<"i32.or">;
export type I32Xor = BasicIdent<"i32.xor">;
export type I32Shl = BasicIdent<"i32.shl">;
export type I32ShrS = BasicIdent<"i32.shr_s">;
export type I32ShrU = BasicIdent<"i32.shr_u">;
export type I32Rotl = BasicIdent<"i32.rotl">;
export type I32Rotr = BasicIdent<"i32.rotr">;

export type I64Clz = BasicIdent<"i64.clz">;
export type I64Ctz = BasicIdent<"i64.ctz">;
export type I64PopCnt = BasicIdent<"i64.popcnt">;
export type I64Add = BasicIdent<"i64.add">;
export type I64Sub = BasicIdent<"i64.sub">;
export type I64Mul = BasicIdent<"i64.mul">;
export type I64DivS = BasicIdent<"i64.div_s">;
export type I64DivU = BasicIdent<"i64.div_u">;
export type I64RemS = BasicIdent<"i64.rem_s">;
export type I64RemU = BasicIdent<"i64.rem_u">;
export type I64And = BasicIdent<"i64.and">;
export type I64Or = BasicIdent<"i64.or">;
export type I64Xor = BasicIdent<"i64.xor">;
export type I64Shl = BasicIdent<"i64.shl">;
export type I64ShrS = BasicIdent<"i64.shr_s">;
export type I64ShrU = BasicIdent<"i64.shr_u">;
export type I64Rotl = BasicIdent<"i64.rotl">;
export type I64Rotr = BasicIdent<"i64.rotr">;

export type F32Abs = BasicIdent<"f32.abs">;
export type F32Neg = BasicIdent<"f32.neg">;
export type F32Ceil = BasicIdent<"f32.ceil">;
export type F32Floor = BasicIdent<"f32.floor">;
export type F32Trunc = BasicIdent<"f32.trunc">;
export type F32Nearest = BasicIdent<"f32.nearest">;
export type F32Sqrt = BasicIdent<"f32.sqrt">;
export type F32Add = BasicIdent<"f32.add">;
export type F32Sub = BasicIdent<"f32.sub">;
export type F32Mul = BasicIdent<"f32.mul">;
export type F32Div = BasicIdent<"f32.div">;
export type F32Min = BasicIdent<"f32.min">;
export type F32Max = BasicIdent<"f32.max">;
export type F32CopySign = BasicIdent<"f32.copysign">;

export type F64Abs = BasicIdent<"f64.abs">;
export type F64Neg = BasicIdent<"f64.neg">;
export type F64Ceil = BasicIdent<"f64.ceil">;
export type F64Floor = BasicIdent<"f64.floor">;
export type F64Trunc = BasicIdent<"f64.trunc">;
export type F64Nearest = BasicIdent<"f64.nearest">;
export type F64Sqrt = BasicIdent<"f64.sqrt">;
export type F64Add = BasicIdent<"f64.add">;
export type F64Sub = BasicIdent<"f64.sub">;
export type F64Mul = BasicIdent<"f64.mul">;
export type F64Div = BasicIdent<"f64.div">;
export type F64Min = BasicIdent<"f64.min">;
export type F64Max = BasicIdent<"f64.max">;
export type F64CopySign = BasicIdent<"f64.copysign">;

export type I32WrapI64 = BasicIdent<"i32.wrap_i64">;
export type I32TruncF32S = BasicIdent<"i32.trunc_f32_s">;
export type I32TruncF32U = BasicIdent<"i32.trunc_f32_u">;
export type I32TruncF64S = BasicIdent<"i32.trunc_f64_s">;
export type I32TruncF64U = BasicIdent<"i32.trunc_f64_u">;

export type I64ExtendI32S = BasicIdent<"i64.extend_i32_s">;
export type I64ExtendI32U = BasicIdent<"i64.extend_i32_u">;
export type I64TruncF32S = BasicIdent<"i64.trunc_f32_s">;
export type I64TruncF32U = BasicIdent<"i64.trunc_f32_u">;
export type I64TruncF64S = BasicIdent<"i64.trunc_f64_s">;
export type I64TruncF64U = BasicIdent<"i64.trunc_f64_u">;

export type F32ConvertI32S = BasicIdent<"f32.convert_i32_s">;
export type F32ConvertI32U = BasicIdent<"f32.convert_i32_u">;
export type F32ConvertI64S = BasicIdent<"f32.convert_i64_s">;
export type F32ConvertI64U = BasicIdent<"f32.convert_i64_u">;
export type F32DemoteF64 = BasicIdent<"f32.demote_f64">;

export type F64ConvertI32S = BasicIdent<"f64.convert_i32_s">;
export type F64ConvertI32U = BasicIdent<"f64.convert_i32_u">;
export type F64ConvertI64S = BasicIdent<"f64.convert_i64_s">;
export type F64ConvertI64U = BasicIdent<"f64.convert_i64_u">;
export type F64PromoteF64 = BasicIdent<"f64.promote_f32">;

export type I32ReinterpretF32 = BasicIdent<"i32.reinterpret_f32">;
export type I64ReinterpretF64 = BasicIdent<"i64.reinterpret_f64">;
export type F32ReinterpretI32 = BasicIdent<"f32.reinterpret_i32">;
export type F64ReinterpretI64 = BasicIdent<"f64.reinterpret_i64">;

export type I32Extend8S = BasicIdent<"i32.extend8_s">;
export type I32Extend16S = BasicIdent<"i32.extend16_s">;

export type I64Extend8S = BasicIdent<"i64.extend8_s">;
export type I64Extend16S = BasicIdent<"i64.extend16_s">;
export type I64Extend32S = BasicIdent<"i64.extend32_s">;

// TODO: add trunc_sat ops

export type NumericInstruction =
  | I32Const
  | I64Const
  | F32Const
  | F64Const
  | I32Eqz
  | I32Eq
  | I32Ne
  | I32LtS
  | I32LtU
  | I32GtS
  | I32GtU
  | I32LeS
  | I32LeU
  | I32GeS
  | I32GeU
  | I64Eqz
  | I64Eq
  | I64Ne
  | I64LtS
  | I64LtU
  | I64GtS
  | I64GtU
  | I64LeS
  | I64LeU
  | I64GeS
  | I64GeU
  | F32Eq
  | F32Ne
  | F32Lt
  | F32Gt
  | F32Le
  | F32Ge
  | F64Eq
  | F64Ne
  | F64Lt
  | F64Gt
  | F64Le
  | F64Ge
  | I32Clz
  | I32Ctz
  | I32PopCnt
  | I32Add
  | I32Sub
  | I32Mul
  | I32DivS
  | I32DivU
  | I32RemS
  | I32RemU
  | I32And
  | I32Or
  | I32Xor
  | I32Shl
  | I32ShrS
  | I32ShrU
  | I32Rotl
  | I32Rotr
  | I64Clz
  | I64Ctz
  | I64PopCnt
  | I64Add
  | I64Sub
  | I64Mul
  | I64DivS
  | I64DivU
  | I64RemS
  | I64RemU
  | I64And
  | I64Or
  | I64Xor
  | I64Shl
  | I64ShrS
  | I64ShrU
  | I64Rotl
  | I64Rotr
  | F32Abs
  | F32Neg
  | F32Ceil
  | F32Floor
  | F32Trunc
  | F32Nearest
  | F32Sqrt
  | F32Add
  | F32Sub
  | F32Mul
  | F32Div
  | F32Min
  | F32Max
  | F32CopySign
  | F64Abs
  | F64Neg
  | F64Ceil
  | F64Floor
  | F64Trunc
  | F64Nearest
  | F64Sqrt
  | F64Add
  | F64Sub
  | F64Mul
  | F64Div
  | F64Min
  | F64Max
  | F64CopySign
  | I32WrapI64
  | I32TruncF32S
  | I32TruncF32U
  | I32TruncF64S
  | I32TruncF64U
  | I64ExtendI32S
  | I64ExtendI32U
  | I64TruncF32S
  | I64TruncF32U
  | F32ConvertI32S
  | F32ConvertI32U
  | F32ConvertI64S
  | F32ConvertI64U
  | F32DemoteF64
  | F64ConvertI32S
  | F64ConvertI32U
  | F64ConvertI64S
  | F64ConvertI64U
  | F64PromoteF64
  | I32ReinterpretF32
  | I64ReinterpretF64
  | F32ReinterpretI32
  | F64ReinterpretI64
  | I32Extend8S
  | I32Extend16S
  | I64Extend8S
  | I64Extend16S
  | I64Extend32S;
