import { decode32 } from "../deps.ts";
import { ValidationError } from "../error.ts";
import type { DecodedModule } from "../types/module/decoded.ts";

export function decodeStartSection(module: DecodedModule, bytes: Uint8Array) {
  const fn = decode32(bytes)[0];
  if (fn >= module.funcs.length) {
    throw new ValidationError("Bad index");
  }

  module.start = fn;
}
