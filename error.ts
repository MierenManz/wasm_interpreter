export class ParsingError extends Error {
  name = "Parsing Error";

  constructor(message: string, options: ErrorOptions = {}) {
    super(message, options);
  }
}

export class RuntimeError extends Error {
  name = "RuntimeError";
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, options);
  }
}

export class DecodingError extends Error {
  name = "DecodingError";
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, options);
  }
}

export class ValidationError extends Error {
  name = "ValidationError";

  constructor(message: string, options: ErrorOptions = {}) {
    super(message, options);
  }
}
