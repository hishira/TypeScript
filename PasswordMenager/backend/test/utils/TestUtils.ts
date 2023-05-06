import { Archiver } from 'archiver';
export class TestUtils {
  static archiverInterfaceVariables = [
    'abort',
    'append',
    'directory',
    'file',
    'finalize',
    'pointer',
    'symlink',
    'on',
  ];
  static expectHasProperties<T>(object: T, ...properties: string[]): void {
    properties.forEach((property) => expect(object).toHaveProperty(property));
  }

  static checkTypeOfValue<T>(value: T, type: string): void {
    expect(typeof value).toBe(type);
  }

  static checkInstanceOfValue<UnknownInstance, Instance>(
    value: UnknownInstance,
    instance: new () => Instance,
  ): void {
    expect(value).toBeInstanceOf(instance);
  }

  static isInstanceOfArchiver(object: unknown): object is Archiver {
    return TestUtils.archiverInterfaceVariables
      .map((archiverVar) => archiverVar in Object)
      .filter((isInObject) => isInObject)
      .find(() => false);
  }
}
