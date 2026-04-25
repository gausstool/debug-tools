import { describe, it, expect } from 'vitest';
import { sizeofByte } from './size-of-byte';

describe('size-of-byte', () => {
  describe('sizeofByte', () => {
    it('should calculate byte size for ASCII characters', () => {
      const result = sizeofByte('hello');
      const parsed = JSON.parse(result);
      expect(parsed.chars).toBe(5);
      expect(parsed.utf8Bytes).toBe(5);
      expect(parsed.utf16Bytes).toBe(10);
    });

    it('should calculate byte size for Chinese characters', () => {
      const result = sizeofByte('你好');
      const parsed = JSON.parse(result);
      expect(parsed.chars).toBe(2);
      expect(parsed.utf8Bytes).toBe(6);
      expect(parsed.utf16Bytes).toBe(4);
    });

    it('should calculate byte size for mixed content', () => {
      const result = sizeofByte('hi你好');
      const parsed = JSON.parse(result);
      expect(parsed.chars).toBe(4);
      expect(parsed.utf8Bytes).toBe(8);
      expect(parsed.utf16Bytes).toBe(8);
    });

    it('should handle emoji', () => {
      const result = sizeofByte('👋');
      const parsed = JSON.parse(result);
      expect(parsed.chars).toBeGreaterThan(0);
      expect(parsed.utf8Bytes).toBeGreaterThan(0);
      expect(parsed.utf16Bytes).toBeGreaterThan(0);
    });

    it('should handle empty string', () => {
      const result = sizeofByte('');
      const parsed = JSON.parse(result);
      expect(parsed.chars).toBe(0);
      expect(parsed.utf8Bytes).toBe(0);
      expect(parsed.utf16Bytes).toBe(0);
    });
  });
});