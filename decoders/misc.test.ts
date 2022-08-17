import { Reader } from "../util/reader.ts";
import { assertEquals, assertThrows } from "../_test_deps.ts";
import {
  decodeGlobalDescriptor,
  decodeResizableLimits,
  decodeValue,
} from "./misc.ts";

Deno.test({
  name: "Decode Value: Throw",
  fn: () => {
    assertThrows(() => decodeValue(new Reader(Uint8Array.of(0x10))));
  },
});

Deno.test({
  name: "Decode Resizable Limits",
  fn: async (t) => {
    await t.step({
      name: "Minimum only",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x00, 0x01));
        const body = decodeResizableLimits(reader);
        assertEquals(body, { min: 1 });
      },
    });

    await t.step({
      name: "Minimum & Maximum",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x01, 0x01, 0x02));
        const body = decodeResizableLimits(reader);
        assertEquals(body, { min: 1, max: 2 });
      },
    });

    await t.step({
      name: "Maximum < Minimum throw",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x01, 0x02, 0x01));
        assertThrows(
          () => decodeResizableLimits(reader),
          "Max size should be greater or equal",
        );
      },
    });
    await t.step({
      name: "Invalid Flags throw",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x02, 0x02, 0x01));
        assertThrows(
          () => decodeResizableLimits(reader),
          "Invalid Flags",
        );
      },
    });
  },
});

Deno.test({
  name: "Decode Global Descriptor",
  fn: async (t) => {
    await t.step({
      name: "Decode Immutable",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x7F, 0x00));
        const descriptor = decodeGlobalDescriptor(reader);
        assertEquals(descriptor, { kind: "i32", mutable: false });
      },
    });

    await t.step({
      name: "Decode Mutable",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x7F, 0x01));
        const descriptor = decodeGlobalDescriptor(reader);
        assertEquals(descriptor, { kind: "i32", mutable: true });
      },
    });

    await t.step({
      name: "Throws",
      fn: () => {
        const reader = new Reader(Uint8Array.of(0x7F, 0x03));
        assertThrows(() => {
          decodeGlobalDescriptor(reader);
        });
      },
    });
  },
});
