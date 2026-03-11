import { EnumTools } from '../types';
import { sizeofByte } from './text/size-of-byte';
import { urlParse } from './url/url-parse';
import { encodeBase64, encodeBase64UrlSafe } from './text/base64';
import { decodeBase64 } from './text/base64';
import { sqlFormat } from './sql/sql-format';
import { sqlCompress } from './sql/sql-compress';
import { urlEncode, urlParamsDecode, urlParamsEncode } from './url/url-encode';
import { urlDecode } from './url/url-encode';
import { cspParse } from './http/csp-parse';
import { cspUnparse } from './http/csp-unparse';
import { httpCacheAnalyze } from './http/http-cache-analyze';
import { httpCorsAnalyze } from './http/http-cors-analyze';
import { textSort } from './text/text-sort';
import { commaSplit, lineSplit, semiSplit } from './text/text-split';
import { nginxLogParser } from './http/nginx-log-parse';
import { randomPassword } from './random/random-password';
import { srtToPlainText } from './text/srt';
import { randomPortString } from './random/random-port';

type ToolFunction = (input: any) => string | Promise<string>;

export const methodMap: Record<EnumTools, ToolFunction> = {
  [EnumTools.TEXT_DIFF]: (input: string) => input, // Placeholder for text diff function
  [EnumTools.TEXT_SORT]: textSort, // Placeholder for text sort function
  [EnumTools.TEXT_SIZE]: sizeofByte,
  [EnumTools.REGEX_TEST]: (input: string) => input, // Placeholder for regex test function
  [EnumTools.URL_PARSE]: urlParse,
  [EnumTools.URL_ENCODE]: urlEncode,
  [EnumTools.URL_DECODE]: urlDecode,
  [EnumTools.URL_COMPONENT_ENCODE]: urlParamsEncode,
  [EnumTools.URL_COMPONENT_DECODE]: urlParamsDecode,
  [EnumTools.CSP_PARSE]: cspParse,
  [EnumTools.CSP_UNPARSE]: cspUnparse,
  [EnumTools.HTTP_CACHE_ANALYZE]: httpCacheAnalyze,
  [EnumTools.HTTP_CORS_ANALYZE]: httpCorsAnalyze,
  [EnumTools.BASE64_ENCODE]: encodeBase64,
  [EnumTools.BASE64_URL_SAFE_ENCODE]: encodeBase64UrlSafe,
  [EnumTools.BASE64_DECODE]: decodeBase64,
  [EnumTools.SQL_FORMAT]: sqlFormat,
  [EnumTools.SQL_COMPRESS]: sqlCompress,
  [EnumTools.TEXT_SPLIT_BY_SEMI]: semiSplit,
  [EnumTools.TEXT_SPLIT_BY_COMMA]: commaSplit,
  [EnumTools.TEXT_SPLIT_BY_LINE]: lineSplit,
  [EnumTools.NGINX_LOG_PARSE]: nginxLogParser,
  [EnumTools.RANDOM_PASSWORD]: randomPassword,
  [EnumTools.TEXT_SRT_PLAIN]: srtToPlainText,
  [EnumTools.RANDOM_PORT]: randomPortString,
};

export async function processContent(input: string, type: EnumTools) {
  if (!methodMap[type]) {
    throw new Error(`Unsupported type: ${type}`);
  }
  return await methodMap[type](input);
}
