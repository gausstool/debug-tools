import { describe, it, expect } from 'vitest';
import { NginxLogParser, nginxLogParser } from './nginx-log-parse';

describe('nginx-log-parse', () => {
  describe('NginxLogParser', () => {
    it('should parse common log format', () => {
      const parser = new NginxLogParser('$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent');
      const logLine = '127.0.0.1 - - [01/Jan/2024:00:00:00 +0000] "GET /path HTTP/1.1" 200 1234';
      const result = parser.parse(logLine);
      expect(result.remote_addr).toBe('127.0.0.1');
      expect(result.request).toBe('GET /path HTTP/1.1');
      expect(result.status).toBe('200');
    });

    it('should handle custom format', () => {
      const parser = new NginxLogParser('$remote_addr $status');
      const result = parser.parse('192.168.1.1 404');
      expect(result.remote_addr).toBe('192.168.1.1');
      expect(result.status).toBe('404');
    });
  });

  describe('nginxLogParser', () => {
    it('should parse single log line', () => {
      const input = '127.0.0.1 - - [01/Jan/2024:00:00:00 +0000] "GET /path HTTP/1.1" 200 1234 "http://example.com" "Mozilla/5.0"';
      const result = nginxLogParser(input);
      const parsed = JSON.parse(result);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].remote_addr).toBeDefined();
    });

    it('should parse multiple log lines', () => {
      const input = `127.0.0.1 - - [01/Jan/2024:00:00:00 +0000] "GET /path HTTP/1.1" 200 1234 "http://example.com" "Mozilla/5.0"
127.0.0.1 - - [01/Jan/2024:00:00:01 +0000] "POST /api HTTP/1.1" 201 100 "http://example.com" "Mozilla/5.0"`;
      const result = nginxLogParser(input);
      const parsed = JSON.parse(result);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].remote_addr).toBe('127.0.0.1');
      expect(parsed[1].request).toContain('POST');
    });

    it('should handle empty input', () => {
      const result = nginxLogParser('');
      const parsed = JSON.parse(result);
      expect(parsed).toHaveLength(0);
    });
  });
});