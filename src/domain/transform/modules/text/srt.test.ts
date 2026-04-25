import { describe, it, expect } from 'vitest';
import { srtToPlainText } from './srt';

describe('srt', () => {
  describe('srtToPlainText', () => {
    it('should extract text from SRT', () => {
      const input = `1
00:00:01,000 --> 00:00:04,000
Hello World

2
00:00:05,000 --> 00:00:08,000
This is a test`;
      const result = srtToPlainText(input);
      expect(result).toContain('Hello World');
      expect(result).toContain('This is a test');
    });

    it('should handle empty input', () => {
      const result = srtToPlainText('');
      expect(result).toBe('');
    });

    it('should handle keepLineBreaks option', () => {
      const input = `1
00:00:01,000 --> 00:00:04,000
Line one
Line two`;
      const result = srtToPlainText(input, { keepLineBreaks: true });
      expect(result).toContain('Line one\nLine two');
    });

    it('should handle joinWith option', () => {
      const input = `1
00:00:01,000 --> 00:00:04,000
First

2
00:00:05,000 --> 00:00:08,000
Second`;
      const result = srtToPlainText(input, { joinWith: ' | ' });
      expect(result).toBe('First | Second');
    });

    it('should handle multiline subtitle', () => {
      const input = `1
00:00:01,000 --> 00:00:04,000
Line one
Line two
Line three`;
      const result = srtToPlainText(input);
      expect(result).toContain('Line one');
      expect(result).toContain('Line two');
      expect(result).toContain('Line three');
    });
  });
});