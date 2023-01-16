import type { BasicIdent } from "../common.ts";

type Table = { tableIndex: number };

export type TableGet = BasicIdent<"table.get"> & Table;
export type TableSet = BasicIdent<"table.set"> & Table;

export interface TableInit {
  kind: "table.init";
  tableIndex: number;
  elementIndex: number;
}

export interface ElementDrop {
  kind: "elem.drop";
  elementIndex: number;
}

export interface TableCopy {
  kind: "table.copy";
  srcTable: number;
  dstTable: number;
}

export type TableGrow = BasicIdent<"table.grow"> & Table;
export type TableSize = BasicIdent<"table.size"> & Table;
export type TableFill = BasicIdent<"table.fill"> & Table;

export type TableInstruction =
  | TableGet
  | TableSet
  | TableInit
  | ElementDrop
  | TableCopy
  | TableGrow
  | TableSize
  | TableFill;
