import type { Compiled, Decoded } from "../types/mod.ts";

export type Exports = Record<string, CallableFunction>;

export function generateExports(
  module: Compiled.Module,
  moduleExports: Decoded.Export[],
): Exports {
  const exports = {} as Exports;

  for (let i = 0; i < moduleExports.length; i++) {
    const { kind, spaceIndex, exportName } = moduleExports[i];
    const section = module[kind + "Space" as keyof Compiled.Module];
    exports[exportName] = section[spaceIndex].callable;
  }

  return exports;
}
