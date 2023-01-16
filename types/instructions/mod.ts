import type { ControlFlowInstruction } from "./control_flow.ts";
import type { MemoryInstruction } from "./memory.ts";
import type { NumericInstruction } from "./numeric.ts";
import type { ParametricInstruction } from "./parametric.ts";
import type { RefInstruction } from "./reference.ts";
import type { TableInstruction } from "./table.ts";
import type { VariableInstruction } from "./variable.ts";

export type Instruction =
  | ControlFlowInstruction
  | MemoryInstruction
  | NumericInstruction
  | ParametricInstruction
  | RefInstruction
  | TableInstruction
  | VariableInstruction;
