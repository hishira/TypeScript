export class NoDatabaseToInitialized extends Error {
  constructor(
    public readonly message = "No database to initialized",
    public readonly name = "No database to initialize find"
  ) {
    super();
  }
}
