import { describe, it, expect } from 'vitest';
import { randomPort, randomPortString } from './random-port';

describe('random-port', () => {
  describe('randomPort', () => {
    it('should return number within range', () => {
      const port = randomPort('test', 3000, 4000);
      expect(port).toBeGreaterThanOrEqual(3000);
      expect(port).toBeLessThanOrEqual(4000);
    });

    it('should return deterministic result for same input', () => {
      const port1 = randomPort('seed', 1000, 60000);
      const port2 = randomPort('seed', 1000, 60000);
      expect(port1).toBe(port2);
    });

    it('should return different results for different inputs', () => {
      const port1 = randomPort('seed1');
      const port2 = randomPort('seed2');
      expect(port1).not.toBe(port2);
    });

    it('should use default range', () => {
      const port = randomPort('test');
      expect(port).toBeGreaterThanOrEqual(1025);
      expect(port).toBeLessThanOrEqual(65535);
    });

    it('should throw error for invalid minPort', () => {
      expect(() => randomPort('test', 0, 65535)).toThrow();
    });

    it('should throw error for invalid maxPort', () => {
      expect(() => randomPort('test', 1025, 65536)).toThrow();
    });

    it('should throw error when minPort > maxPort', () => {
      expect(() => randomPort('test', 5000, 1000)).toThrow();
    });
  });

  describe('randomPortString', () => {
    it('should return string', () => {
      const portStr = randomPortString('test');
      expect(typeof portStr).toBe('string');
    });
  });
});