import { setup } from "./setup.ts";

const [subcommand] = Deno.args;

switch (subcommand) {
  case "setup":
    await setup();
    break;
  case "test":
  case "update":
    console.error("Unimplemented");
    Deno.exit(1);
    /** "Falls through": it does not */
  default:
    console.error("Unknown command");
    Deno.exit(1);
}
