import { Reader } from "./reader.ts";
import { assert, assertEquals, assertThrows } from "../_test_deps.ts";
Deno.test({
  name: "Reader: Normal",
  fn: async (t) => {
    await t.step({
      name: "readUint8",
      fn: () => {
        const f = new Reader(Uint8Array.of(0x00));
        assertEquals(f.readUint8(), 0);
        assertThrows(() => f.readUint8(), "Out of bound");
      },
    });

    await t.step({
      name: "readUint32",
      fn: () => {
        const f = new Reader(new Uint8Array(Uint32Array.of(12).buffer));
        assertEquals(f.readUint32(true), 12);
      },
    });

    await t.step({
      name: "readSlice",
      fn: () => {
        const f = new Reader(Uint8Array.of(12, 12));
        assertEquals(f.readSlice(2), Uint8Array.of(12, 12));
      },
    });

    await t.step({
      name: "readString",
      fn: () => {
        const f = new Reader(Uint8Array.of(12, 12));
        assertEquals(f.readString(2), String.fromCharCode(12, 12));
      },
    });

    await t.step({
      name: "setReadHead",
      fn: () => {
        const f = new Reader(Uint8Array.of(1, 2, 3, 4, 5));
        const firstSlice = f.readSlice(5);
        f.setReadHead(0);

        assertEquals(firstSlice, f.readSlice(5));
        assertThrows(() => f.setReadHead(-1));
      },
    });

    await t.step({
      name: "getReadHead",
      fn: () => {
        const f = new Reader(Uint8Array.of(1, 5));
        f.readSlice(2);
        assertEquals(f.getReadHead(), 2);
      },
    });

    await t.step({
      name: "isConsumed",
      fn: () => {
        const f = new Reader(Uint8Array.of());
        assert(f.isConsumed());
      },
    });
  },
});
