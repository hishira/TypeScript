export class TestUtils {
  static expectHasProperties(
    object: { [key: string]: any },
    ...properties: string[]
  ) {
    for (const property of properties) {
      expect(object).toHaveProperty(property);
    }
  }
}
