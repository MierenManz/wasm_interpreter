import type { BasicIdent, ValType } from "../common.ts";

export type Unreachable = BasicIdent<"unreachable">;
export type Nop = BasicIdent<"nop">;

export interface Loop {
  kind: "loop";
  /** Return type (needs assertion) */
  blockKind: ValType[];
  /** Index to jump to */
  depth: number;
}

export interface Block {
  kind: "block";
  /** Return type (needs assertion) */
  blockKind: ValType[];
  /** Index to jump to */
  depth: number;
}

export interface If {
  kind: "if";
  /** Return type (needs assertion) */
  blockKind: ValType[];
  /** Index to jump to if condition is true */
  jmpTrue: number;

  /** Index to jump to if condition is false */
  jmpFalse: number;
  /** Index to jump to once code has been ran */
  jmpEnd: number;
}

// Not needed. Parsed away into the `If`
// export interface Else {
//   kind: "else";
// }

export interface Br {
  kind: "br";
  jmp: number;
}

export interface BrIf {
  kind: "br_if";
  jmpTrue: number;
  // jmpEnd not needed. If false just continue to next instruction
}

export interface BrTable {
  kind: "br_table";
  possibleJmps: number[];
  fallbackJmp: number;
}

export interface Return {
  kind: "return";
}

export interface Call {
  kind: "call";
  fnIndex: number;
}

export interface CallIndirect {
  kind: "call_indirect";
  typeIndex: number;
  tableIndex: number;
}

export type ControlFlowInstruction =
  | Unreachable
  | Nop
  | Loop
  | Block
  | If
  | Br
  | BrIf
  | BrTable
  | Return
  | Call
  | CallIndirect;
