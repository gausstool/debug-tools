export function urlEncode(input: string) {
  try {
    return encodeURI(input);
  } catch (error) {
    throw new Error(`URL编码失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

export function urlDecode(input: string) {
  try {
    return decodeURI(input);
  } catch (error) {
    throw new Error(`URL解码失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

export function urlParamsEncode(input: string) {
  try {
    return encodeURIComponent(input);
  } catch (error) {
    throw new Error(`URL参数编码失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

export function urlParamsDecode(input: string) {
  try {
    return decodeURIComponent(input);
  } catch (error) {
    throw new Error(`URL参数解码失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}