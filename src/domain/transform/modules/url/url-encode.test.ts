import { describe, it, expect } from 'vitest';
import { urlEncode, urlDecode, urlParamsEncode, urlParamsDecode } from './url-encode';

describe('url-encode', () => {
  describe('urlEncode', () => {
    it('should encode URL special characters', () => {
      const result = urlEncode('hello world');
      expect(result).toBe('hello%20world');
    });

    it('should encode Chinese characters', () => {
      const result = urlEncode('你好');
      expect(result).toContain('%E4%BD%A0');
    });
  });

  describe('urlDecode', () => {
    it('should decode encoded URL', () => {
      const result = urlDecode('hello%20world');
      expect(result).toBe('hello world');
    });
  });

  describe('urlParamsEncode', () => {
    it('should encode more characters than urlEncode', () => {
      const result = urlParamsEncode('hello=world');
      expect(result).toBe('hello%3Dworld');
    });
  });

  describe('urlParamsDecode', () => {
    it('should decode encoded parameters', () => {
      const result = urlParamsDecode('hello%3Dworld');
      expect(result).toBe('hello=world');
    });
  });
});