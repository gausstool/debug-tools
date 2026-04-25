import { describe, it, expect, vi, beforeEach } from 'vitest';
import { urlParse } from './url-parse';

describe('url-parse', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('urlParse', () => {
    it('should parse a valid URL', () => {
      const result = urlParse('https://example.com:8080/path?query=1#anchor');
      const parsed = JSON.parse(result);
      expect(parsed.protocol).toBe('https:');
      expect(parsed.host).toBe('example.com:8080');
      expect(parsed.hostname).toBe('example.com');
      expect(parsed.port).toBe('8080');
      expect(parsed.pathname).toBe('/path');
      expect(parsed.search).toBe('?query=1');
    });

    it('should handle URL without port', () => {
      const result = urlParse('https://example.com/path');
      const parsed = JSON.parse(result);
      expect(parsed.port).toBe('');
      expect(parsed.hostname).toBe('example.com');
    });

    it('should handle URL with hash path', () => {
      const result = urlParse('https://example.com/#/path');
      const parsed = JSON.parse(result);
      expect(parsed.hash).toBe('#/path');
      expect(parsed.hashPath).toBe('/path');
    });
  });
});