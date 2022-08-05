export type ValueKind = "i32" | "i64" | "f32" | "f64";
export type Signatures = ValueKind | "func" | "funcref";

export type ExternalKind = "func" | "table" | "memory" | "global";

/** Descriptor for both `table` and `memory` */
export interface ResizableLimits {
  min: number;
  max?: number;
}

export interface GlobalDescriptor {
  kind: ValueKind;
  mutable: boolean;
}
