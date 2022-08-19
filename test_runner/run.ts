import { instantiateModule } from "../module.ts";

// deno-lint-ignore no-explicit-any
const { print } = (Deno as any).core;

interface ModuleCommand {
  type: "module";
  line: number;
  filename: string;
}

type ValueKind = "i32" | "i64" | "f32" | "f64";

interface Arg {
  type: ValueKind;
  value: string;
}

interface AssertReturn {
  type: "assert_return";
  line: number;
  action: {
    field: string;
    args: Arg[];
    expected: Arg[];
  };
}

interface AssertTrap {
  type: "assert_trap";
  line: number;
  action: {
    field: string;
    args: Arg[];
    expected: Array<ValueKind>;
    text: string;
  };
}

type AnyAssert = AssertReturn | AssertTrap;

type Command = ModuleCommand | AnyAssert;

interface TestFile {
  source_filename: string;
  commands: Command[];
}

interface Failed {
  module: string;
  line: number;
  error: string;
}

interface TestResult {
  passed: boolean;
  file: string;
  fails?: Failed[];
}

const TYPE_PARSER: Record<ValueKind, CallableFunction> = {
  "i32": parseInt,
  "i64": BigInt,
  "f32": (x: string) => Float32Array.of(parseFloat(x))[0],
  "f64": parseFloat,
};

export async function runTests() {
  Deno.chdir(new URL("../testdata", import.meta.url));
  const fails: Failed[] = [];
  for await (const testFile of getJSONFiles()) {
    const start = performance.now();
    const result: TestResult = {
      passed: true,
      file: testFile.source_filename,
      fails: [],
    };

    const [moduleCount, testCount] = testFile.commands.reduce((acc, x) => {
      x.type === "module" ? acc[0]++ : acc[1]++;
      return acc;
    }, [0, 0]);

    print(
      `\x1b[0m\x1b[38;5;245mRunning ${moduleCount} modules (${testCount} tests) from ${result.file}\x1b[0m\n`,
    );
    for (let i = 0; i < testFile.commands.length; i++) {
      const { filename } = testFile.commands[i] as ModuleCommand;
      const module = await Deno.readFile(filename)
        .then(instantiateModule);
      i++;

      for (; i < testFile.commands.length; i++) {
        const command = testFile.commands[i];
        if (command.type === "module") {
          i--;
          break;
        }

        const { field: fnName, args, expected } =
          (command as AssertReturn).action;
        print(`  ${fnName} (${filename})\n`);
        try {
          const expectedResult = expected.map((x) =>
            TYPE_PARSER[x.type](x.value)
          );

          if (command.type === "assert_return") {
            assertReturn(module[fnName], args, expectedResult);
          } else if (command.type === "assert_trap") {
            assertTrap(module[fnName], args, command);
          }
        } catch (e) {
          result.passed = false;
          result.fails!.push({
            line: command.line,
            error: e,
            module: result.file,
          });
        }
      }
    }

    if (result.passed) {
      print(
        `${result.file} ... \x1b[0m\x1b[32mok \x1b[0m\x1b[0m\x1b[38;5;245m(${
          (performance.now() - start).toFixed(0)
        }ms)\x1b[0m\n`,
      );
    } else {
      print(`${result.file}\n`);
      fails.push(...result.fails!);
    }
  }
  print(
    `\n\n\x1b[0m\x1b[1;31mError${fails!.length > 1 ? "s" : ""}\x1b[0m${
      fails
        ?.map((x) =>
          `\n\x1b[0m\x1b[31mError on line ${x.line} (${x.module}):\x1b[0m ${x.error}`
        )
        .join("")
    }\n`,
  );
}

async function* getJSONFiles(): AsyncGenerator<TestFile> {
  for await (const entry of Deno.readDir("./")) {
    if (entry.isFile && entry.name.endsWith(".json")) {
      yield Deno.readTextFile(entry.name).then(JSON.parse);
    }
  }
}

function assertTrap(fn: CallableFunction, args: Arg[], command: AssertTrap) {
  try {
    fn(
      ...args.map((x) => TYPE_PARSER[x.type](x.value)),
    );
  } catch (e) {
    if (e.message !== command.action.text) {
      throw "Wrong Error message";
    }
  }
}

function assertReturn(
  fn: CallableFunction,
  args: Arg[],
  expectedResult: Array<bigint | number>,
) {
  const actual = fn(
    ...args.map((x) => TYPE_PARSER[x.type](x.value)),
  );

  if (actual.length !== expectedResult.length) {
    throw `Result mismatch: Expected ${expectedResult.length} but got ${actual.length}`;
  }

  for (let i = 0; i < actual.length; i++) {
    if (
      typeof actual[i] !== typeof expectedResult[i] ||
      actual[i] !== expectedResult[i]
    ) {
      throw `Result mismatch: Expected ${expectedResult[i]} but got ${
        actual[i]
      }`;
    }
  }
}
