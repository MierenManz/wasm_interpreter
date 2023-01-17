import { run } from "./_util.ts";

const TEST_SUITE_URL = new URL("../testsuite/", import.meta.url);
const OUTPUT_DIR = new URL("./tests/", import.meta.url);


export async function setup() {
  await Deno.mkdir(OUTPUT_DIR, { recursive: true });
  Deno.chdir(OUTPUT_DIR);
  console.log("Successfully setup test directory");
  const dirIter = Deno.readDir(TEST_SUITE_URL);

  for await (const entry of dirIter) {
    if (!entry.isFile || !entry.name.endsWith(".wast")) continue;
    const inputURL = new URL(entry.name, TEST_SUITE_URL);
    await run("wast2json", inputURL.pathname);
    console.log(`Compiled: ${entry.name}`);
  }

  console.log("Compiling complete!");
  console.log("Cleaning up unwanted files!");
  // Delete all .wat files
  const outFiles = Deno.readDir(OUTPUT_DIR);

  for await (const entry of outFiles) {
    if (!entry.isFile || !entry.name.endsWith(".wat")) continue;

    const inputURL = new URL(entry.name, OUTPUT_DIR);
    await Deno.remove(inputURL);
  }

  console.log("Setup complete!")
}

if (import.meta.main) {
  await setup();
}