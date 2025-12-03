import { EnumTools } from '../types';
import { sizeofByte } from './modules/size-of-byte';
import { urlParse } from './modules/url-parse';
import { encodeBase64 } from './modules/base64';
import { decodeBase64 } from './modules/base64';
import { sqlFormat } from './modules/sql-format';
import { sqlCompress } from './modules/sql-compress';
import { urlEncode } from './modules/url';
import { urlDecode } from './modules/url';
import { cspParse } from './modules/csp-parse';
import { cspUnparse } from './modules/csp-unparse';
import { httpCacheAnalyze } from './modules/http-cache-analyze';
import { httpCorsAnalyze } from './modules/http-cors-analyze';
import { textSort } from './modules/text-sort';

type ToolFunction = (input: string) => string | Promise<string>;

export const methodMap: Record<EnumTools, ToolFunction> = {
  [EnumTools.TEXT_DIFF]: (input: string) => input, // Placeholder for text diff function
  [EnumTools.TEXT_SORT]: textSort, // Placeholder for text sort function
  [EnumTools.TEXT_SIZE]: sizeofByte,
  [EnumTools.REGEX_TEST]: (input: string) => input, // Placeholder for regex test function
  [EnumTools.URL_PARSE]: urlParse,
  [EnumTools.URL_ENCODE]: urlEncode,
  [EnumTools.URL_DECODE]: urlDecode,
  [EnumTools.CSP_PARSE]: cspParse,
  [EnumTools.CSP_UNPARSE]: cspUnparse,
  [EnumTools.HTTP_CACHE_ANALYZE]: httpCacheAnalyze,
  [EnumTools.HTTP_CORS_ANALYZE]: httpCorsAnalyze,
  [EnumTools.BASE64_ENCODE]: encodeBase64,
  [EnumTools.BASE64_DECODE]: decodeBase64,
  [EnumTools.SQL_FORMAT]: sqlFormat,
  [EnumTools.SQL_COMPRESS]: sqlCompress,
};

export async function processContent(input: string, type: EnumTools) {
  if (!methodMap[type]) {
    throw new Error(`Unsupported type: ${type}`);
  }
  console.log('processContent', type)
  let output = "";
  let flag = "success";
  try {
    const result = methodMap[type](input);
    if (result instanceof Promise) {
      output = await result;
    } else {
      output = result;
    }
  } catch (error) {
    flag = "failure";
    output = error instanceof Error ? error.message : '处理失败';
  }
  return [output, flag];
}

