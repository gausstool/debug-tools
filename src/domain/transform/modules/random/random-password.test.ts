import { describe, it, expect } from 'vitest';
import { randomString, randomPassword } from './random-password';

describe('random-password', () => {
  describe('randomString', () => {
    it('should return string with specified length', () => {
      const result = randomString(10);
      expect(result).toHaveLength(10);
    });

    it('should use default length', () => {
      const result = randomString();
      expect(result).toHaveLength(12);
    });

    it('should use default chars', () => {
      const result = randomString(100);
      expect(result).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789]+$/);
    });

    it('should throw error for empty chars', () => {
      expect(() => randomString(10, '')).toThrow();
    });

    it('should throw error for length < 1', () => {
      expect(() => randomString(0)).toThrow();
    });

    it('should work with custom chars', () => {
      const result = randomString(10, 'ab');
      expect(result).toMatch(/^[ab]+$/);
    });
  });

  describe('randomPassword', () => {
    it('should return string with specified length', () => {
      const result = randomPassword(10);
      expect(result).toHaveLength(10);
    });

    it('should use default length', () => {
      const result = randomPassword();
      expect(result).toHaveLength(12);
    });

    it('should not include ambiguous characters', () => {
      const result = randomPassword(1000);
      expect(result).not.toContain('0');
      expect(result).not.toContain('O');
      expect(result).not.toContain('I');
      expect(result).not.toContain('l');
    });
  });
});