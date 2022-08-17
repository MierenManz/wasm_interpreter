import { decodeVarint } from "../util/varint.ts";
import { decodeArray, decodeValue } from "./misc.ts";
import type { FunctionBody } from "../types/decoded.ts";
import type { Reader } from "../util/reader.ts";

export function decodeFnBody(reader: Reader): FunctionBody {
  const totalBodySize = decodeVarint(reader);
  const preLocalHead = reader.getReadHead();
  const locals = decodeArray(
    reader,
    (r) => ({ count: decodeVarint(r), kind: decodeValue(r) }),
  ).map((x) => new Array(x.count).fill(x.kind)).flat();

  const instructionSize = totalBodySize - (reader.getReadHead() - preLocalHead);

  const instructions = reader.readSlice(instructionSize);
  if (instructionSize !== instructions.length || !reader.isConsumed()) {
    throw new Error("Invalid total body length");
  }

  return {
    locals,
    instructions,
  };
}
