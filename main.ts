import { instanciateModule } from "./module.ts";

const bytes = Deno.readFileSync("mod.wasm");
const module = instanciateModule(
  bytes,
);

console.log(module.add(1.5, 5));
