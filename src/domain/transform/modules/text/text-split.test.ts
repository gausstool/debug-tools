import { describe, it, expect } from 'vitest';
import { textSplit, semiSplit, commaSplit, lineSplit } from './text-split';

describe('text-split', () => {
  describe('textSplit', () => {
    it('should split by custom separator', () => {
      const result = textSplit('a;b;c', ';');
      const parsed = JSON.parse(result);
      expect(parsed).toEqual(['a', 'b', 'c']);
    });
  });

  describe('semiSplit', () => {
    it('should split by semicolon', () => {
      const result = semiSplit('a;b;c');
      const parsed = JSON.parse(result);
      expect(parsed).toEqual(['a', 'b', 'c']);
    });
  });

  describe('commaSplit', () => {
    it('should split by comma', () => {
      const result = commaSplit('a,b,c');
      const parsed = JSON.parse(result);
      expect(parsed).toEqual(['a', 'b', 'c']);
    });
  });

  describe('lineSplit', () => {
    it('should split by newline', () => {
      const result = lineSplit('a\nb\nc');
      const parsed = JSON.parse(result);
      expect(parsed).toEqual(['a', 'b', 'c']);
    });
  });
});