import type { BasicIdent } from "../common.ts";

export type RefNull = BasicIdent<"ref.null">;
export type RefIsNull = BasicIdent<"ref.is_null">;

export interface RefFunc {
  kind: "ref.func";
  fnIndex: number;
}

export type RefInstruction = RefNull | RefIsNull | RefFunc;
