import { ValType } from "../common.ts";

export abstract class Instruction {
  readonly abstract kind: string;
  abstract pop(ctx: void): ValType[];
  abstract push(ctx: void): ValType[];

  abstract execute(ctx: void): boolean;
}
