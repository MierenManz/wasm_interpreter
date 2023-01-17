export async function run(...command: string[]): Promise<boolean> {
  const p = Deno.run({
    cmd: command,
    stderr: "inherit",
    stdout: "inherit",
    stdin: "null",
  });

  const status = await p.status();
  p.close();
  return status.success;
}