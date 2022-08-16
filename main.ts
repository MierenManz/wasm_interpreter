// import { call } from "./interpreter/mod.ts";
import { instanciateModule } from "./module.ts";

const module = instanciateModule(Deno.readFileSync("mod.wasm"), {});

// const res = call(module, 0, 12, 8);
console.log(module);

// const res2 = call(module, 1, 7, 27);

// console.log(res2);
