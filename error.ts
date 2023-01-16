export class ParsingError extends Error {
  name = "Parsing Error";

  constructor(message: string, options: ErrorOptions) {
    super(message, options);
  }
}
