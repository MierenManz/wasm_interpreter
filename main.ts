import { instantiateModule } from "./module.ts";

const bytes = Deno.readFileSync("mod.wasm");
const module = instantiateModule(
  bytes,
);

console.log(module.add(1, 5));
