import type { Compiled } from "../../types/mod.ts";
import type { Reader } from "../../util/reader.ts";

export function end(
  _module: Compiled.Module,
  reader: Reader,
  context: Compiled.FunctionContext,
): boolean {
  // Throw if there is a unexpected end
  if (context.cfStack.length === 0 && !reader.isConsumed()) {
    throw new Error("Unexpected end");
  }

  if (context.cfStack.length > 0) {
    // Only needs to pop the last controlflow frame.
    // Branch calls need to set the reader.
    context.cfStack.pop()!;
    return false;
  }

  if (
    context.result.length !== context.stack.length ||
    context.result.some((x, i) => x !== context.stack[i].kind)
  ) {
    throw new Error(
      `Expected: ${context.result} but found: ${
        context.stack.map((x) => x.kind)
      }`,
    );
  }
  // Last end call. Should return `true` to indicate stop
  return true;
}
