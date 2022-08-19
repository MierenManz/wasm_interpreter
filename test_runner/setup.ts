import { requires, run } from "./_util.ts";

export async function setup() {
  await requires("git", "wast2json");
  await run("Fetching repo", ["git", "submodule", "init"]);

  await Deno.mkdir(new URL("../testdata", import.meta.url), {
    recursive: true,
  });
  await compile();
  await clear();
  console.log("Setup complete");
}

async function compile() {
  Deno.chdir(new URL("../testdata", import.meta.url));
  for await (const entry of Deno.readDir("../testsuite")) {
    if (
      entry.isFile && entry.name.endsWith(".wast") &&
      !entry.name.includes("simd")
    ) {
      await run(`compiling ${entry.name}`.padEnd(40), [
        "wast2json",
        `../testsuite/${entry.name}`,
      ]);
    }
  }
}

async function clear() {
  // Still in `../testdata`
  for await (const entry of Deno.readDir("./")) {
    if (entry.isFile && entry.name.endsWith(".wat")) {
      Deno.remove(entry.name);
    }
  }
}
