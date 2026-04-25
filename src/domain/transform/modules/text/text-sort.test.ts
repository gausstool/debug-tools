import { describe, it, expect } from 'vitest';
import { textSort } from './text-sort';

describe('text-sort', () => {
  describe('textSort', () => {
    it('should sort lines alphabetically', () => {
      const input = 'banana\napple\ncherry';
      const result = textSort(input);
      expect(result).toBe('apple\nbanana\ncherry');
    });

    it('should handle empty input', () => {
      const result = textSort('');
      expect(result).toBe('');
    });

    it('should filter empty lines', () => {
      const input = 'banana\n\napple\n';
      const result = textSort(input);
      expect(result).toBe('apple\nbanana');
    });

    it('should handle single line', () => {
      const result = textSort('apple');
      expect(result).toBe('apple');
    });
  });
});