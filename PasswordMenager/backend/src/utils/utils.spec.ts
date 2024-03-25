import { isDefined, IsNotUndefined } from './utils';

describe('Utility functions', () => {
  describe('isDefined', () => {
    it('should return true for defined values', () => {
      expect(isDefined(5)).toBe(true);
      expect(isDefined('test')).toBe(true);
      expect(isDefined({})).toBe(true);
      expect(isDefined([])).toBe(true);
      expect(isDefined(true)).toBe(true);
    });

    it('should return false for undefined or null values', () => {
      expect(isDefined(undefined)).toBe(false);
      expect(isDefined(null)).toBe(false);
    });
  });

  describe('IsNotUndefined', () => {
    it('should return true for defined values', () => {
      expect(IsNotUndefined(5)).toBe(true);
      expect(IsNotUndefined('test')).toBe(true);
      expect(IsNotUndefined({})).toBe(true);
      expect(IsNotUndefined([])).toBe(true);
      expect(IsNotUndefined(true)).toBe(true);
    });

    it('should return false for undefined values', () => {
      expect(IsNotUndefined(undefined)).toBe(false);
    });

    it('should return true for null values', () => {
      expect(IsNotUndefined(null)).toBe(true);
    });
  });
});
