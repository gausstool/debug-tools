import { describe, it, expect } from 'vitest';
import { cspUnparse } from './csp-unparse';


describe('csp-unparse', () => {
  describe('cspUnparse', () => {
    it('should convert object to CSP string', () => {
      const input = JSON.stringify({ 'default-src': ["'self'"] });
      const result = cspUnparse(input);
      expect(result).toContain('default-src');
      expect(result).toContain("'self'");
    });

    it('should handle multiple directives', () => {
      const input = JSON.stringify({
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"]
      });
      const result = cspUnparse(input);
      expect(result).toContain('default-src');
      expect(result).toContain('script-src');
      expect(result).toContain('Content-Security-Policy:');
    });
  });
});