import { assertEquals, assertThrows } from "../_test_deps.ts";
import { Reader } from "../util/reader.ts";
import { decodeImport } from "./import_section.ts";

Deno.test({
  name: "Decode Import Section: Decoders",
  fn: async (t) => {
    const moduleName = "mod".split("").map((x) => x.charCodeAt(0));
    const exportName = "export".split("").map((x) => x.charCodeAt(0));

    await t.step({
      name: "Decode Func",
      fn: () => {
        const buffer = Uint8Array.of(
          moduleName.length,
          ...moduleName,
          exportName.length,
          ...exportName,
          0x00,
          0x01,
        );

        const imp = decodeImport(new Reader(buffer));
        assertEquals(imp, {
          moduleName: "mod",
          exportName: "export",
          kind: "func",
          signatureIndex: 1,
        });
      },
    });

    await t.step({
      name: "Decode Table",
      fn: () => {
        const buffer = Uint8Array.of(
          moduleName.length,
          ...moduleName,
          exportName.length,
          ...exportName,
          0x01,
          0x70,
          0x00,
          0x01,
        );

        const imp = decodeImport(new Reader(buffer));

        assertEquals(imp, {
          moduleName: "mod",
          exportName: "export",
          kind: "table",
          descriptor: { min: 1 },
        });
      },
    });

    await t.step({
      name: "Decode Memory",
      fn: () => {
        const buffer = Uint8Array.of(
          moduleName.length,
          ...moduleName,
          exportName.length,
          ...exportName,
          0x02,
          0x00,
          0x01,
        );

        const imp = decodeImport(new Reader(buffer));

        assertEquals(imp, {
          moduleName: "mod",
          exportName: "export",
          kind: "memory",
          descriptor: { min: 1 },
        });
      },
    });

    await t.step({
      name: "Decode Global",
      fn: () => {
        const buffer = Uint8Array.of(
          moduleName.length,
          ...moduleName,
          exportName.length,
          ...exportName,
          0x03,
          0x7F,
          0x00,
        );

        const imp = decodeImport(new Reader(buffer));

        assertEquals(imp, {
          moduleName: "mod",
          exportName: "export",
          kind: "global",
          descriptor: { kind: "i32", mutable: false },
        });
      },
    });
  },
});

Deno.test({
  name: "Decode Import Section: Errors",
  fn: async (t) => {
    const moduleName = "mod".split("").map((x) => x.charCodeAt(0));
    const exportName = "export".split("").map((x) => x.charCodeAt(0));

    await t.step({
      name: "Table invalid Signature",
      fn: () => {
        const buffer = Uint8Array.of(
          moduleName.length,
          ...moduleName,
          exportName.length,
          ...exportName,
          0x01,
          0x00,
        );

        assertThrows(() => decodeImport(new Reader(buffer)));
      },
    });

    await t.step({
      name: "Invalid Import kind",
      fn: () => {
        const buffer = Uint8Array.of(
          moduleName.length,
          ...moduleName,
          exportName.length,
          ...exportName,
          0x04,
        );

        assertThrows(() => decodeImport(new Reader(buffer)));
      },
    });
  },
});
