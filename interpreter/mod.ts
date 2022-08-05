import { decodeVarint } from "../deps.ts";
import type { Compiled } from "../types/mod.ts";

export function call<
  T extends Array<number> | Array<bigint> | Array<number | bigint>,
>(
  module: Compiled.Module,
  fnIndex: number,
  ...parameters: Array<number | bigint>
): T | bigint | number {
  const func = module.functionSpace[fnIndex];

  if (func.params.length !== parameters.length) {
    throw new Error("Parameter count does not match");
  }

  // Loop over all parameters
  for (let i = 0; i < func.params.length; i++) {
    const funcParameter = func.params[i];
    const param = parameters[i];

    // Check if parameter should be passed as a bigint
    if (funcParameter.kind === "i64" && typeof param !== "bigint") {
      throw new Error("Invalid type");
    }

    // Set parameter value
    switch (funcParameter.kind) {
      case "i32":
        funcParameter.inner = (param as number) | 0;
        break;
      case "i64":
        funcParameter.inner = BigInt.asIntN(64, param as bigint);
        break;
      case "f32":
        funcParameter.inner = Float32Array.of(param as number)[0];
        break;
      case "f64":
        funcParameter.inner = Float64Array.of(param as number)[0];
        break;
    }
  }

  // Reset function locals
  for (let i = 0; i < func.locals.length; i++) {
    func.locals[i].inner = 0;
  }
  // Reset stack
  func.stack = [];

  for (let i = 0; i < func.instructions.length;) {
    const byte = func.instructions[i];
    i++;
    switch (byte) {
      // local.get
      case 0x20: {
        const [ptr, bytesUsed] = decodeVarint(func.instructions, i);
        i = bytesUsed;
        const value = ptr < func.params.length
          ? func.params[ptr]
          : func.locals[ptr - func.params.length];
        func.stack.push(value);
        break;
      }
      // i32.add
      case 0x6A: {
        const a = func.stack.pop();
        const b = func.stack.pop();

        if (a === undefined || b === undefined) throw new Error("Empty stack");
        if (a.kind !== "i32" || b.kind !== "i32") {
          throw new Error("Invalid type on the stack");
        }
        func.stack.push({ kind: "i32", inner: a.inner + b.inner });
        break;
      }
      // End (but nop for now)
      case 0x0B:
        break;
      default:
        throw new Error("Unimplemented");
    }
  }

  func.stack = func.stack.filter((x) => x !== undefined);
  // Possibly return a single value
  if (func.stack.length === 1) return func.stack[0].inner;
  // Return everything left on the stack
  return func.stack.map((x) => x.inner) as T;
}
