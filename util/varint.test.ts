import { assertEquals, assertThrows } from "../_test_deps.ts";
import { Reader } from "./reader.ts";
import { decodeVarint } from "./varint.ts";

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
