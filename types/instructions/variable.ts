import type { BasicIdent } from "../common.ts";

type Index = { index: number };

export type LocalGet = BasicIdent<"local.get"> & Index;
export type LocalSet = BasicIdent<"local.set"> & Index;
export type LocalTee = BasicIdent<"local.tee"> & Index;

export type GlobalGet = BasicIdent<"global.get"> & Index;
export type GlobalSet = BasicIdent<"global.set"> & Index;

export type VariableInstruction =
  | LocalGet
  | LocalSet
  | LocalTee
  | GlobalGet
  | GlobalSet;
