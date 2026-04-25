import { describe, it, expect } from 'vitest';
import { cspParse } from './csp-parse';

describe('csp-parse', () => {
  describe('cspParse', () => {
    it('should parse simple CSP', () => {
      const input = "default-src 'self'";
      const result = cspParse(input);
      const parsed = JSON.parse(result);
      expect(parsed['default-src']).toContain("'self'");
    });

    it('should parse CSP with multiple directives', () => {
      const input = "default-src 'self'; script-src 'self' 'unsafe-inline'";
      const result = cspParse(input);
      const parsed = JSON.parse(result);
      expect(parsed['default-src']).toBeDefined();
      expect(parsed['script-src']).toBeDefined();
    });

    it('should handle CSP with prefix', () => {
      const input = "Content-Security-Policy: default-src 'self'";
      const result = cspParse(input);
      const parsed = JSON.parse(result);
      expect(parsed['default-src']).toBeDefined();
    });
  });

});