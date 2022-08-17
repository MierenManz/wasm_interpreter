import { Reader } from "../util/reader.ts";
import { assertEquals, assertThrows } from "../_test_deps.ts";
import { decodeTable } from "./table_section.ts";

Deno.test({
  name: "Decode Table Section",
  fn: async (t) => {
    await t.step({
      name: "Decode Table",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x70, 0x00, 0x01));
        const table = decodeTable(reader);
        assertEquals(table, { min: 1 });
      },
    });

    await t.step({
      name: "Throw",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x00));
        assertThrows(() => decodeTable(reader));
      },
    });
  },
});
