import type { BasicIdent, ValType } from "../common.ts";

export type Drop = BasicIdent<"drop">;

export interface Select {
  kind: "select";
  valType: ValType[];
}

export type ParametricInstruction = Drop | Select;
