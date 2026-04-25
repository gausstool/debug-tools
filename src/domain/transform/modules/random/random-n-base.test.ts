import { describe, it, expect } from 'vitest';
import { randomNBase, getSupportedBases } from './random-n-base';

describe('random-n-base', () => {
  describe('randomNBase', () => {
    it('should return string with specified length', () => {
      const result = randomNBase(10, 10);
      expect(result).toHaveLength(10);
    });

    it('should use default parameters', () => {
      const result = randomNBase();
      expect(result).toHaveLength(32);
    });

    it('should work with base 2', () => {
      const result = randomNBase(2, 10);
      expect(result).toMatch(/^[01]+$/);
    });

    it('should work with base 8', () => {
      const result = randomNBase(8, 10);
      expect(result).toMatch(/^[0-7]+$/);
    });

    it('should work with base 16', () => {
      const result = randomNBase(16, 10);
      expect(result).toMatch(/^[0-9a-f]+$/);
    });

    it('should work with base 36', () => {
      const result = randomNBase(36, 10);
      expect(result).toMatch(/^[0-9a-z]+$/);
    });

    it('should work with base 62', () => {
      const result = randomNBase(62, 10);
      expect(result).toMatch(/^[0-9a-zA-Z]+$/);
    });

    it('should work with base 64', () => {
      const result = randomNBase(64, 10);
      expect(result).toMatch(/^[0-9a-zA-Z\-_]+$/);
    });

    it('should throw error for unsupported base', () => {
      expect(() => randomNBase(3, 10)).toThrow();
    });

    it('should throw error for length < 1', () => {
      expect(() => randomNBase(10, 0)).toThrow();
    });
  });

  describe('getSupportedBases', () => {
    it('should return array of supported bases', () => {
      const bases = getSupportedBases();
      expect(bases).toContain(2);
      expect(bases).toContain(8);
      expect(bases).toContain(10);
      expect(bases).toContain(16);
      expect(bases).toContain(36);
      expect(bases).toContain(62);
      expect(bases).toContain(64);
    });
  });
});