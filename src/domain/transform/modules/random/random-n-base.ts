const BASE_CHARS: Record<number, string> = {
  2: '01',
  8: '01234567',
  10: '0123456789',
  16: '0123456789abcdef',
  36: '0123456789abcdefghijklmnopqrstuvwxyz',
  62: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  64: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'
};

export function randomNBase(base: number = 10, length: number = 32): string {
  const chars = BASE_CHARS[base];
  if (!chars) {
    throw new Error(`不支持的进制: ${base}。支持的进制有: 2, 8, 10, 16, 36, 62, 64`);
  }
  if (length < 1) {
    throw new Error('长度必须大于0');
  }
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getSupportedBases(): number[] {
  return Object.keys(BASE_CHARS).map(Number);
}
