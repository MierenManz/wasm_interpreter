import { instantiateModule } from "./module.ts";

const bytes = Deno.readFileSync("../wasm_export_gen/change_case.wasm");
const module = instantiateModule(
  bytes,
);

console.log(module.add(1, 5));
