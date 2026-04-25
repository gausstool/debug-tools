import { describe, it, expect } from 'vitest';
import { httpCorsAnalyze } from './http-cors-analyze';

describe('http-cors-analyze', () => {
  describe('httpCorsAnalyze', () => {
    it('should analyze wildcard CORS', () => {
      const input = `Access-Control-Allow-Origin: *`;
      const result = httpCorsAnalyze(input);
      const parsed = JSON.parse(result);
      expect(parsed.headers['Access-Control-Allow-Origin']).toBe('*');
      expect(parsed.summary).toContain('允许跨域');
    });

    it('should analyze specific origin', () => {
      const input = `Access-Control-Allow-Origin: https://example.com`;
      const result = httpCorsAnalyze(input);
      const parsed = JSON.parse(result);
      expect(parsed.headers['Access-Control-Allow-Origin']).toBe('https://example.com');
    });

    it('should analyze with credentials', () => {
      const input = `Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Credentials: true`;
      const result = httpCorsAnalyze(input);
      const parsed = JSON.parse(result);
      expect(parsed.headers['Access-Control-Allow-Credentials']).toBe('true');
      expect(parsed.summary).toContain('允许携带凭证');
    });

    it('should analyze allowed methods', () => {
      const input = `Access-Control-Allow-Methods: GET, POST, PUT`;
      const result = httpCorsAnalyze(input);
      const parsed = JSON.parse(result);
      expect(parsed.headers['Access-Control-Allow-Methods']).toContain('GET');
      expect(parsed.headers['Access-Control-Allow-Methods']).toContain('POST');
    });

    it('should handle empty input', () => {
      const result = httpCorsAnalyze('');
      const parsed = JSON.parse(result);
      expect(parsed.summary).toContain('未设置CORS');
    });
  });
});