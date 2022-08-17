import { TEXT_DECODER } from "./misc.ts";

export class Reader {
  #ptr: number;
  #inner: Uint8Array;
  #dataview: DataView;

  constructor(inner: Uint8Array) {
    this.#ptr = 0;
    this.#inner = inner;
    this.#dataview = new DataView(
      inner.buffer,
      inner.byteOffset,
      inner.byteLength,
    );
  }

  #checkOutOfBound(length: number) {
    if ((this.#inner.length - this.#ptr) < length) {
      throw new RangeError("Out of bound");
    }
  }

  readUint8(): number {
    this.#checkOutOfBound(1);
    const byte = this.#inner[this.#ptr];
    this.#ptr++;
    return byte;
  }

  readUint32(littleEndian: boolean): number {
    this.#checkOutOfBound(4);
    const int = this.#dataview.getUint32(this.#ptr, littleEndian);
    this.#ptr += 4;
    return int;
  }

  readSlice(length: number): Uint8Array {
    this.#checkOutOfBound(length);
    const end = this.#ptr + length;
    const slice = this.#inner.subarray(this.#ptr, end);
    this.#ptr = end;
    return slice;
  }

  readString(length: number): string {
    return TEXT_DECODER.decode(this.readSlice(length));
  }

  setReadHead(offset: number) {
    if (offset >= this.#inner.length || offset < 0) {
      throw new RangeError("Out of bound");
    }

    this.#ptr = offset;
  }

  getReadHead(): number {
    return this.#ptr;
  }

  isConsumed(): boolean {
    return this.#ptr >= this.#inner.length;
  }
}
