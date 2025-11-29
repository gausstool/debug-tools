export function urlEncode(input: string) {
  try {
    return encodeURIComponent(input);
  } catch (error) {
    throw new Error(`URL编码失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

export function urlDecode(input: string) {
  try {
    return decodeURIComponent(input);
  } catch (error) {
    throw new Error(`URL解码失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}