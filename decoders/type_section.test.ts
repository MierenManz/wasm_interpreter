import { Reader } from "../util/reader.ts";
import { assertEquals, assertThrows } from "../_test_deps.ts";
import { decodeSignature } from "./type_section.ts";

Deno.test({
  name: "Decode Type Section: Params only",
  fn: async (t) => {
    await t.step({
      name: "Single param",
      fn: () => {
        const signature = Uint8Array.of(
          0x60,
          0x01,
          0x7F,
          0x00,
        );
        const decodedSig = decodeSignature(new Reader(signature));
        assertEquals(decodedSig, { params: ["i32"], result: [] });
      },
    });

    await t.step({
      name: "Multi param",
      fn: () => {
        const signature = Uint8Array.of(
          0x60,
          0x04,
          0x7F,
          0x7E,
          0x7D,
          0x7C,
          0x00,
        );
        const decodedSig = decodeSignature(new Reader(signature));
        assertEquals(decodedSig, {
          params: ["i32", "i64", "f32", "f64"],
          result: [],
        });
      },
    });

    await t.step({
      name: "Throws",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x00));
        assertThrows(() => decodeSignature(reader));
      },
    });
  },
});

Deno.test({
  name: "Decode Type Section: Result only",
  fn: async (t) => {
    await t.step({
      name: "Single result",
      fn: () => {
        const signature = Uint8Array.of(
          0x60,
          0x00,
          0x01,
          0x7F,
        );
        const decodedSig = decodeSignature(new Reader(signature));
        assertEquals(decodedSig, { params: [], result: ["i32"] });
      },
    });

    await t.step({
      name: "Multi result",
      fn: () => {
        const signature = Uint8Array.of(
          0x60,
          0x00,
          0x04,
          0x7F,
          0x7E,
          0x7D,
          0x7C,
        );
        const decodedSig = decodeSignature(new Reader(signature));
        assertEquals(decodedSig, {
          params: [],
          result: ["i32", "i64", "f32", "f64"],
        });
      },
    });
  },
});

Deno.test({
  name: "Decode Type Section: Params & Result",
  fn: async (t) => {
    await t.step({
      name: "Single param & result",
      fn: () => {
        const signature = Uint8Array.of(
          0x60,
          0x01,
          0x7F,
          0x01,
          0x7F,
        );
        const decodedSig = decodeSignature(new Reader(signature));
        assertEquals(decodedSig, { params: ["i32"], result: ["i32"] });
      },
    });

    await t.step({
      name: "Multi param & result",
      fn: () => {
        const signature = Uint8Array.of(
          0x60,
          0x04,
          0x7F,
          0x7E,
          0x7D,
          0x7C,
          0x04,
          0x7F,
          0x7E,
          0x7D,
          0x7C,
        );
        const decodedSig = decodeSignature(new Reader(signature));
        assertEquals(decodedSig, {
          params: ["i32", "i64", "f32", "f64"],
          result: ["i32", "i64", "f32", "f64"],
        });
      },
    });
  },
});
