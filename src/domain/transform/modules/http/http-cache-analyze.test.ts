import { describe, it, expect } from 'vitest';
import { httpCacheAnalyze } from './http-cache-analyze';

describe('http-cache-analyze', () => {
  describe('httpCacheAnalyze', () => {
    it('should analyze max-age cache control', () => {
      const input = `Cache-Control: max-age=3600`;
      const result = httpCacheAnalyze(input);
      const parsed = JSON.parse(result);
      expect(parsed.headers['Cache-Control']).toBe('max-age=3600');
      expect(parsed.summary).toContain('强缓存');
    });

    it('should analyze no-store', () => {
      const input = `Cache-Control: no-store`;
      const result = httpCacheAnalyze(input);
      const parsed = JSON.parse(result);
      expect(parsed.summary).toContain('禁止缓存');
    });

    it('should analyze no-cache', () => {
      const input = `Cache-Control: no-cache`;
      const result = httpCacheAnalyze(input);
      const parsed = JSON.parse(result);
      expect(parsed.summary).toContain('验证缓存');
    });

    it('should analyze with ETag', () => {
      const input = `ETag: "abc123"`;
      const result = httpCacheAnalyze(input);
      const parsed = JSON.parse(result);
      expect(parsed.headers['ETag']).toBe('"abc123"');
    });

    it('should handle empty input', () => {
      const result = httpCacheAnalyze('');
      const parsed = JSON.parse(result);
      expect(parsed.summary).toContain('无缓存');
    });
  });
});