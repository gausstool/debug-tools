import { describe, it, expect } from 'vitest';
import { regexMatch } from './regexp';

describe('regexp', () => {
  describe('regexMatch', () => {
    it('should match regex pattern in string', () => {
      const result = regexMatch('\\d+', 'abc123def');
      expect(result).toContain('123');
    });

    it('should return "未匹配到内容" when no match', () => {
      const result = regexMatch('\\d+', 'abcdef');
      expect(result).toContain('未匹配到内容');
    });

    it('should handle regex with groups', () => {
      const result = regexMatch('(\\w+)@(\\w+)', 'test@example');
      expect(result).toContain('test@example');
      expect(result).toContain('test');
      expect(result).toContain('example');
    });

    it('should handle invalid regex', () => {
      const result = regexMatch('[', 'test');
      expect(result).toContain('未匹配到内容');
    });
  });
});