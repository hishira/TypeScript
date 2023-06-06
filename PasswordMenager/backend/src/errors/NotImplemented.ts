export class NotImplementedError extends Error {
  readonly errorMessage = 'Method not implemented.';
  readonly errorName = 'Implementation';

  constructor() {
    super();
    this.message = this.errorMessage;
    this.name = this.errorName;
  }
}
