export class NotDefinedDatabaseError extends Error {
  constructor() {
    super();
    this.message = "Database is not defined";
    this.name = "NotDefinedDatabaseError";
  }
}
