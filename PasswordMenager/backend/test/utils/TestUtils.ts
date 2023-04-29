export class TestUtils {
  static expectHasProperties<T>(object: T, ...properties: string[]): void {
    properties.forEach((property) => expect(object).toHaveProperty(property));
  }
}
