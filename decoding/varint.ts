import * as lz4 from "https://deno.land/x/lz4@v0.1.2/mod.ts";
export const source = lz4.decompress(
  Uint8Array.from(
    atob(
      "9DYAYXNtAQAAAAEVBGAAAn9/YAF/AX9gAAJ+f2ABfgF/AwUEAAECAwUDAQABB0gFBm1lbW9yeQIADHZhcmludERlY29kZQAPACFFbg8AkwENdmFybG9uZx8AFAIQAAMgAPFIAwqbAQQLAQF/EAIhAKcgAAsHACAArRADC0UCAX8DfgJAA0AgADEAACIDQv8AgyAChiABhCEBIAJCB3wiAiADQoABg1ANASAAQQFqIQBCxgBUDQALAAsgIgBygKcLPwEBf0QAMUKAfyoAMAEgAEoA9AlCgAGEPAAAIABCB4ghACABQQFqIgFBCkk/ABAAHQAgAQs=",
    ),
    (c) => c.charCodeAt(0),
  ),
);
const mod = await WebAssembly.instantiate(source);
const memory = new Uint8Array(
  (mod.instance.exports.memory as WebAssembly.Memory).buffer,
);

type Exports = {
  varintEncode(value: number): number;
  varintDecode(): [number, number];
  varlongEncode(value: bigint): number;
  varlongDecode(): [bigint, number];
};

const exports = mod.instance.exports as Exports;

const {
  varlongDecode: VARLONG_DECODE,
} = exports;

export function varintEncode(value: number) {
  return memory.subarray(0, exports.varintEncode(value) + 1);
}

export function varintDecode(value: Uint8Array) {
  memory.set(value);
  return exports.varintDecode();
}

export function varlongEncode(value: bigint) {
  return memory.subarray(0, exports.varlongEncode(value) + 1);
}

export function varlongDecode(value: Uint8Array) {
  memory.set(value);
  return VARLONG_DECODE();
}
