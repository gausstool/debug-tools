export function httpCorsAnalyze(input: string) {
  try {
    // 构建结果对象
    const result: Record<string, any> = {
      summary: '',
      details: [],
      headers: {}
    };
    
    // 解析HTTP响应头
    const headers: Record<string, string> = {};
    const lines = input.trim().split('\n');
    
    for (const line of lines) {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        const [, key, value] = match;
        headers[key.toLowerCase()] = value;
      }
    }
    
    // 提取CORS相关的字段
    const accessControlAllowOrigin = headers['access-control-allow-origin'] || '';
    const accessControlAllowMethods = headers['access-control-allow-methods'] || '';
    const accessControlAllowHeaders = headers['access-control-allow-headers'] || '';
    const accessControlAllowCredentials = headers['access-control-allow-credentials'] || '';
    const accessControlExposeHeaders = headers['access-control-expose-headers'] || '';
    const accessControlMaxAge = headers['access-control-max-age'] || '';
    
    // 保存提取的CORS字段
    result.headers = {
      'Access-Control-Allow-Origin': accessControlAllowOrigin,
      'Access-Control-Allow-Methods': accessControlAllowMethods,
      'Access-Control-Allow-Headers': accessControlAllowHeaders,
      'Access-Control-Allow-Credentials': accessControlAllowCredentials,
      'Access-Control-Expose-Headers': accessControlExposeHeaders,
      'Access-Control-Max-Age': accessControlMaxAge
    };
    
    // 分析CORS策略
    const analysis: string[] = [];
    let corsStatus = '未设置CORS';
    
    // 分析Access-Control-Allow-Origin
    if (accessControlAllowOrigin) {
      corsStatus = '允许跨域';
      if (accessControlAllowOrigin === '*') {
        analysis.push('设置了 Access-Control-Allow-Origin: * - 允许所有域名跨域访问');
      } else {
        analysis.push(`设置了 Access-Control-Allow-Origin: ${accessControlAllowOrigin} - 仅允许指定域名跨域访问`);
      }
    } else {
      analysis.push('未设置 Access-Control-Allow-Origin - 不允许跨域访问');
    }
    
    // 分析Access-Control-Allow-Methods
    if (accessControlAllowMethods) {
      const methods = accessControlAllowMethods.split(',').map(m => m.trim());
      analysis.push(`设置了 Access-Control-Allow-Methods: ${methods.join(', ')} - 允许的HTTP方法`);
    }
    
    // 分析Access-Control-Allow-Headers
    if (accessControlAllowHeaders) {
      const headersList = accessControlAllowHeaders.split(',').map(h => h.trim());
      analysis.push(`设置了 Access-Control-Allow-Headers: ${headersList.join(', ')} - 允许的自定义请求头`);
    }
    
    // 分析Access-Control-Allow-Credentials
    if (accessControlAllowCredentials === 'true') {
      analysis.push('设置了 Access-Control-Allow-Credentials: true - 允许携带凭证（如Cookie）跨域');
      if (accessControlAllowOrigin === '*') {
        analysis.push('⚠️ 警告: 当设置了credentials=true时，Access-Control-Allow-Origin不能为*，这会导致跨域失败');
      }
    }
    
    // 分析Access-Control-Expose-Headers
    if (accessControlExposeHeaders) {
      const exposedHeaders = accessControlExposeHeaders.split(',').map(h => h.trim());
      analysis.push(`设置了 Access-Control-Expose-Headers: ${exposedHeaders.join(', ')} - 允许前端获取的响应头`);
    }
    
    // 分析Access-Control-Max-Age
    if (accessControlMaxAge) {
      const maxAge = parseInt(accessControlMaxAge);
      analysis.push(`设置了 Access-Control-Max-Age: ${maxAge} - 预检请求结果的缓存时间为${formatDuration(maxAge)}`);
    }
    
    // 生成摘要
    result.summary = `跨域状态: ${corsStatus}`;
    if (corsStatus === '允许跨域') {
      if (accessControlAllowCredentials === 'true') {
        result.summary += '，允许携带凭证';
      }
    }
    
    result.details = analysis;
    
    // 返回格式化的JSON字符串
    return JSON.stringify(result, null, 2);
  } catch (error) {
    throw new Error(`HTTP跨域解读失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

// 格式化秒数为易读的时间
function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}秒`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}分${remainingSeconds}秒` : `${minutes}分`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    return remainingMinutes > 0 ? `${hours}小时${remainingMinutes}分` : `${hours}小时`;
  } else {
    const days = Math.floor(seconds / 86400);
    const remainingHours = Math.floor((seconds % 86400) / 3600);
    return remainingHours > 0 ? `${days}天${remainingHours}小时` : `${days}天`;
  }
}