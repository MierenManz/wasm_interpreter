import { decodeCodeSection } from "./decoders/code_section.ts";
import { decodeTypeSection } from "./decoders/type_section.ts";
import { decodeFunctionSection } from "./decoders/function_section.ts";
import { Compiled, Decoded } from "./types/mod.ts";
import { consume } from "./util.ts";
export function instanciateModule(
  bytes: Uint8Array,
  _imports: WebAssembly.Imports,
): Compiled.Module {
  const view = new DataView(bytes.buffer);
  if (view.getUint32(0, true) !== 0x6D736100) {
    throw new Error("Bad Magic cookie");
  }
  if (view.getUint32(4, true) !== 1) {
    throw new Error("Imcompatible wasm binary");
  }

  const decodedModule: Decoded.Module = {
    typeSection: [],
    functionSection: [],
    codeSection: [],
  };

  consume(bytes, 8);

  decodeTypeSection(bytes, decodedModule);
  decodeFunctionSection(bytes, decodedModule);
  decodeCodeSection(bytes, decodedModule);

  // TODO: Validate if codeSection.length === functionSection.length

  const compiledModule: Compiled.Module = {
    functionSpace: [],
  };

  for (let i = 0; i < decodedModule.functionSection.length; i++) {
    const typeSignature =
      decodedModule.typeSection[decodedModule.functionSection[i]];

    const codeBody = decodedModule.codeSection[i];

    const func: Compiled.Func = {
      params: typeSignature.params.map((x) => ({
        kind: x,
        inner: x === "i64" ? 0n : 0,
      })) as unknown as Compiled.Value[],
      result: typeSignature.result,
      locals: codeBody.locals.map((x) => ({
        kind: x,
        inner: x === "i64" ? 0n : 0,
      })) as unknown as Compiled.Value[],
      stack: [],
      instructions: codeBody.instructions,
    };
    compiledModule.functionSpace.push(func);
  }

  return compiledModule;
}
