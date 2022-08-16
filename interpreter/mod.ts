import { decodeVarint } from "../util/varint.ts";

import type { Compiled } from "../types/mod.ts";
import type { Reader } from "../util/reader.ts";

export function interpret(
  _: unknown, //module: Compiled.Module,
  reader: Reader,
  resources: Compiled.FunctionResources,
) {
  while (!reader.isConsumed()) {
    const instr = reader.readUint8();
    switch (instr) {
      // local.get
      case 0x20: {
        const ptr = decodeVarint(reader);
        if (ptr >= resources.locals.length || ptr < 0) {
          throw new RangeError("Invalid Index");
        }

        // Reference
        const val = resources.locals[ptr];
        // Deep copy to push onto the stack
        resources.stack.push(structuredClone(val));
        break;
      }

      // i32.add

      case 0x6A: {
        const a = resources.stack.pop();
        const b = resources.stack.pop();
        if (!a || !b) throw new Error("Expected i32. Found void");
        if (a.kind !== "i32" || b.kind !== "i32") {
          throw new Error(`Expected [i32, i32]. Found [${a.kind}, ${b.kind}]`);
        }

        const res: Compiled.Value = { kind: "i32", value: a.value + b.value };
        resources.stack.push(res);
        break;
      }

      // End

      case 0x0B: {
        // Throw if there is a unexpected end
        if (resources.cfStack.length === 0 && !reader.isConsumed()) {
          throw new Error("Unexpected end");
        }

        if (resources.cfStack.length > 0) {
          // Only needs to pop the last controlflow frame.
          // Branch calls need to set the reader.
          resources.cfStack.pop()!;
          break;
        }

        if (
          resources.result.length !== resources.stack.length ||
          resources.result.some((x, i) => x !== resources.stack[i].kind)
        ) {
          throw new Error(
            `Expected: ${resources.result} but found: ${
              resources.stack.map((x) => x.kind)
            }`,
          );
        }

        break;
      }

      default:
        throw new Error("Unknown instruction");
    }
  }
}
