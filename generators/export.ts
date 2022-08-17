import type { Compiled, Decoded } from "../types/mod.ts";

export function generateExports(
  module: Compiled.Module,
  moduleExports: Decoded.Export[],
): Record<string, CallableFunction> {
  const exports: Record<string, CallableFunction> = {};

  for (let i = 0; i < moduleExports.length; i++) {
    const { kind, spaceIndex, exportName } = moduleExports[i];
    const section = module[kind + "Space" as keyof Compiled.Module];
    exports[exportName] = section[spaceIndex].callable;
  }

  return exports;
}
