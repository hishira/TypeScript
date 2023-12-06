export class CsvEntry {
  constructor(
    public title: string,
    public username: string,
    public password: string,
    public note: string,
  ) {}

  toString(): string {
    return `${this.title}, ${this.username}, ${this.password}, ${this.note}`;
  }
}
