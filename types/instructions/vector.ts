import type { BasicIdent, MemoryArg } from "../common.ts";
type Lane = { laneIndex: number };

export type V128Load = BasicIdent<"v128.load"> & MemoryArg;
export type V128Load8x8S = BasicIdent<"v128.load8x8_s"> & MemoryArg;
export type V128Load8x8U = BasicIdent<"v128.load8x8_u"> & MemoryArg;
export type V128Load16x4S = BasicIdent<"v128.load16x4_s"> & MemoryArg;
export type V128Load16x4U = BasicIdent<"v128.load16x4_u"> & MemoryArg;
export type V128Load32x2S = BasicIdent<"v128.load32x2_s"> & MemoryArg;
export type V128Load32x2U = BasicIdent<"v128.load32x2_u"> & MemoryArg;
export type V128Load8Splat = BasicIdent<"v128.load8_splat"> & MemoryArg;
export type V128Load16Splat = BasicIdent<"v128.load16_splat"> & MemoryArg;
export type V128Load32Splat = BasicIdent<"v128.load32_splat"> & MemoryArg;
export type V128Load64Splat = BasicIdent<"v128.load64_splat"> & MemoryArg;
export type V128Load32Zero = BasicIdent<"v128.load32_zero"> & MemoryArg;
export type V128Load64Zero = BasicIdent<"v128.load64_zero"> & MemoryArg;
export type V128Store = BasicIdent<"v128.store"> & MemoryArg;
export type V128Load8Lane = BasicIdent<"v128.load8_lane"> & MemoryArg & Lane;
export type V128Load16Lane = BasicIdent<"v128.load16_lane"> & MemoryArg & Lane;
export type V128Load32Lane = BasicIdent<"v128.load32_lane"> & MemoryArg & Lane;
export type V128Load64Lane = BasicIdent<"v128.load64_lane"> & MemoryArg & Lane;
export type V128Store8Lane = BasicIdent<"v128.store8_lane"> & MemoryArg & Lane;
export type V128Store16Lane =
  & BasicIdent<"v128.store16_lane">
  & MemoryArg
  & Lane;
export type V128Store32Lane =
  & BasicIdent<"v128.store32_lane">
  & MemoryArg
  & Lane;
export type V128Store64Lane =
  & BasicIdent<"v128.store64_lane">
  & MemoryArg
  & Lane;

export interface V128Const {
  kind: "v128.const";
  /** Static size of 16 */
  value: Uint8Array;
}

export interface V128Shuffle {
  kind: "v128.shuffle";
  /** Static size of 16 */
  lanes: Uint8Array;
}

export type I8x16ExtractLaneS = BasicIdent<"i8x16.extract_lane_s"> & Lane;
export type I8x16ExtractLaneU = BasicIdent<"i8x16.extract_lane_u"> & Lane;
export type I8x16ReplaceLane = BasicIdent<"i8x16.replace_lane"> & Lane;
export type I16x8ExtractLaneS = BasicIdent<"i16x8.extract_lane_s"> & Lane;
export type I16x8ExtractLaneU = BasicIdent<"i16x8.extract_lane_u"> & Lane;
export type I16x8ReplaceLane = BasicIdent<"i16x8.replace_lane"> & Lane;
export type I32x4ExtractLane = BasicIdent<"i32x4.extract_lane"> & Lane;
export type I32x4ReplaceLane = BasicIdent<"i32x4.replace_lane"> & Lane;
export type I64x2ExtractLane = BasicIdent<"i64x2.extract_lane"> & Lane;
export type I64x2ReplaceLane = BasicIdent<"i64x2.replace_lane"> & Lane;
export type F32x4ExtractLane = BasicIdent<"f32x4.extract_lane"> & Lane;
export type F32x4ReplaceLane = BasicIdent<"f32x4.replace_lane"> & Lane;
export type F64x2ExtractLane = BasicIdent<"f64x2.extract_lane"> & Lane;
export type F64x2ReplaceLane = BasicIdent<"f64x2.replace_lane"> & Lane;

export type I8x16Swizzle = BasicIdent<"i8x16.swizzle">;
export type I8x16Splat = BasicIdent<"i8x16.splat">;
export type I16x8Splat = BasicIdent<"i16x8.splat">;
export type I32x4Splat = BasicIdent<"i32x4.splat">;
export type I64x2Splat = BasicIdent<"i64x2.splat">;
export type F32x4Splat = BasicIdent<"f32x4.splat">;
export type F64x2Splat = BasicIdent<"f64x2.splat">;

export type I8x16Eq = BasicIdent<"i8x16.eq">;
export type I8x16Ne = BasicIdent<"i8x16.ne">;
export type I8x16LtS = BasicIdent<"i8x16.lt_s">;
export type I8x16LtU = BasicIdent<"i8x16.lt_u">;
export type I8x16GtS = BasicIdent<"i8x16.gt_s">;
export type I8x16GtU = BasicIdent<"i8x16.gt_u">;
export type I8x16LeS = BasicIdent<"i8x16.le_s">;
export type I8x16LeU = BasicIdent<"i8x16.le_u">;
export type I8x16GeS = BasicIdent<"i8x16.ge_s">;
export type I8x16GeU = BasicIdent<"i8x16.ge_u">;

export type I16x8Eq = BasicIdent<"i16x8.eq">;
export type I16x8Ne = BasicIdent<"i16x8.ne">;
export type I16x8LtS = BasicIdent<"i16x8.lt_s">;
export type I16x8LtU = BasicIdent<"i16x8.lt_u">;
export type I16x8GtS = BasicIdent<"i16x8.gt_s">;
export type I16x8GtU = BasicIdent<"i16x8.gt_u">;
export type I16x8LeS = BasicIdent<"i16x8.le_s">;
export type I16x8LeU = BasicIdent<"i16x8.le_u">;
export type I16x8GeS = BasicIdent<"i16x8.ge_s">;
export type I16x8GeU = BasicIdent<"i16x8.ge_u">;

export type I32x4Eq = BasicIdent<"i32x4.eq">;
export type I32x4Ne = BasicIdent<"i32x4.ne">;
export type I32x4LtS = BasicIdent<"i32x4.lt_s">;
export type I32x4LtU = BasicIdent<"i32x4.lt_u">;
export type I32x4GtS = BasicIdent<"i32x4.gt_s">;
export type I32x4GtU = BasicIdent<"i32x4.gt_u">;
export type I32x4LeS = BasicIdent<"i32x4.le_s">;
export type I32x4LeU = BasicIdent<"i32x4.le_u">;
export type I32x4GeS = BasicIdent<"i32x4.ge_s">;
export type I32x4GeU = BasicIdent<"i32x4.ge_u">;

export type I64x2Eq = BasicIdent<"i64x2.eq">;
export type I64x2Ne = BasicIdent<"i64x2.ne">;
export type I64x2LtS = BasicIdent<"i64x2.lt_s">;
export type I64x2LtU = BasicIdent<"i64x2.lt_u">;
export type I64x2GtS = BasicIdent<"i64x2.gt_s">;
export type I64x2GtU = BasicIdent<"i64x2.gt_u">;
export type I64x2LeS = BasicIdent<"i64x2.le_s">;
export type I64x2LeU = BasicIdent<"i64x2.le_u">;
export type I64x2GeS = BasicIdent<"i64x2.ge_s">;
export type I64x2GeU = BasicIdent<"i64x2.ge_u">;

export type F32x4Eq = BasicIdent<"i32x4.eq">;
export type F32x4Ne = BasicIdent<"i32x4.ne">;
export type F32x4Lt = BasicIdent<"i32x4.lt">;
export type F32x4Gt = BasicIdent<"i32x4.gt">;
export type F32x4Le = BasicIdent<"i32x4.le">;
export type F32x4Ge = BasicIdent<"i32x4.ge">;

export type F64x2Eq = BasicIdent<"f64x2.eq">;
export type F64x2Ne = BasicIdent<"f64x2.ne">;
export type F64x2Lt = BasicIdent<"f64x2.lt">;
export type F64x2Gt = BasicIdent<"f64x2.gt">;
export type F64x2Le = BasicIdent<"f64x2.le">;
export type F64x2Ge = BasicIdent<"f64x2.ge">;

export type V128Not = BasicIdent<"v128.not">;
export type V128And = BasicIdent<"v128.and">;
export type V128AndNot = BasicIdent<"v128.andnot">;
export type V128Or = BasicIdent<"v128.or">;
export type V128Xor = BasicIdent<"v128.or">;
export type V128BitSelect = BasicIdent<"v128.bitselect">;
export type V128AnyTrue = BasicIdent<"v128.any_true">;

// TODO: Add more instruction
