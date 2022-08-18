import { assertEquals, assertThrows } from "../_test_deps.ts";
import { Reader } from "./reader.ts";
import { decodeSignedVarint, decodeVarint } from "./varint.ts";

Deno.test({
  name: "Varint decode",
  fn: async (t) => {
    await t.step({
      name: "Decode: 1 byte",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x05));
        assertEquals(decodeVarint(reader), 5);
      },
    });

    await t.step({
      name: "Decode: 2 byte",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0xdd, 0xc7, 0x01));
        assertEquals(decodeVarint(reader), 25565);
      },
    });

    await t.step({
      name: "Decode: varint GT 32bit throws",
      fn: () => {
        const reader = new Reader(
          Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
        );

        assertThrows(() => decodeVarint(reader), "VarInt is too big");
      },
    });
  },
});

Deno.test({
  name: "Signed Varint decode",
  fn: async (t) => {
    await t.step({
      name: "Decode: 1 byte",
      fn: () => {
        let reader = new Reader(Uint8Array.of(0x76));
        assertEquals(decodeSignedVarint(reader), -10);
        reader = new Reader(Uint8Array.of(0x0A));
        assertEquals(decodeSignedVarint(reader), 10);
      },
    });

    await t.step({
      name: "Decode: 2 byte",
      fn: () => {
        let reader = new Reader(Uint8Array.of(0x98, 0x78));
        assertEquals(decodeSignedVarint(reader), -1000);
        reader = new Reader(Uint8Array.of(0xE8, 0x07));
        assertEquals(decodeSignedVarint(reader), 1000);
      },
    });
  },
});
