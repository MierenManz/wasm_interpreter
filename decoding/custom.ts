import { TEXT_DECODER } from "./util.ts";
import { varintDecode } from "./varint.ts";
import type { DecodedModule } from "../types/module/decoded.ts";

export function decodeCustomSection(module: DecodedModule, bytes: Uint8Array) {
  const [nameLength, offset] = varintDecode(bytes);
  const name = TEXT_DECODER.decode(bytes.subarray(0, nameLength));
  module.customSection.push({
    name,
    buff: bytes.subarray(offset + nameLength),
  });
}
