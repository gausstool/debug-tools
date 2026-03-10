export function randomString(length: number = 12, chars: string = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789") {
  if (!chars || chars.length === 0) {
    throw new Error('字符范围不能为空');
  }
  if (length < 1) {
    throw new Error('长度必须大于0');
  }
  
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function randomPassword(length: number = 12) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  return randomString(length, chars);
}