import { setup } from "./setup.ts";
import { runTests } from "./run.ts";

const [command] = Deno.args;

switch (command) {
  case "run":
    await runTests();
    break;
  // case "update":
  //   updateExpectations();
  //   break;
  case "setup":
    await setup();
}
