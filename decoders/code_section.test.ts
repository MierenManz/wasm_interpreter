import { Reader } from "../util/reader.ts";
import { decodeFnBody } from "./code_section.ts";
import { assertEquals, assertThrows } from "../_test_deps.ts";

Deno.test({
  name: "Decode Code Section: Instructions only",
  fn: () => {
    const fnBody = Uint8Array.of(
      0x07,
      0x00,
      0x20,
      0x00,
      0x20,
      0x01,
      0x6A,
      0x0B,
    );

    const decodedBody = decodeFnBody(new Reader(fnBody));

    assertEquals(decodedBody, {
      locals: [],
      instructions: Uint8Array.of(0x20, 0, 0x20, 1, 0x6A, 0x0B),
    });
  },
});

Deno.test({
  name: "Decode Code Section: Locals only",
  fn: async (t) => {
    await t.step({
      name: "Single Local",
      fn: () => {
        const fnBody = Uint8Array.of(
          3,
          0x01,
          0x01,
          0x7F,
        );

        const decodedBody = decodeFnBody(new Reader(fnBody));

        assertEquals(decodedBody, {
          locals: ["i32"],
          instructions: new Uint8Array(),
        });
      },
    });

    await t.step({
      name: "Multiple Locals",
      fn: () => {
        const fnBody = Uint8Array.of(
          5,
          0x02,
          0x02,
          0x7F,
          0x01,
          0x7D,
        );

        const decodedBody = decodeFnBody(new Reader(fnBody));

        assertEquals(decodedBody, {
          locals: ["i32", "i32", "f32"],
          instructions: new Uint8Array(),
        });
      },
    });
  },
});

Deno.test({
  name: "Decode Code Section: Locals & Instructions",
  fn: async (t) => {
    await t.step({
      name: "Normal",
      fn: () => {
        const fnBody = Uint8Array.of(
          0x09,
          0x01,
          0x01,
          0x7F,
          0x20,
          0x00,
          0x20,
          0x01,
          0x6A,
          0x0B,
        );

        const decodedBody = decodeFnBody(new Reader(fnBody));

        assertEquals(decodedBody, {
          locals: ["i32"],
          instructions: Uint8Array.of(0x20, 0x00, 0x20, 0x01, 0x6A, 0x0B),
        });
      },
    });

    await t.step({
      name: "Throws",
      fn: () => {
        const fnBody = Uint8Array.of(
          0x05,
          0x01,
          0x01,
          0x7F,
          0x20,
          0x00,
          0x20,
          0x01,
          0x6A,
          0x0B,
        );

        assertThrows(() => decodeFnBody(new Reader(fnBody)));
      },
    });
  },
});
