export function httpCacheAnalyze(input: string) {
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
    
    // 提取缓存相关的字段
    const cacheControl = headers['cache-control'] || '';
    const expires = headers['expires'] || '';
    const lastModified = headers['last-modified'] || '';
    const eTag = headers['etag'] || '';
    
    // 保存提取的缓存字段
    result.headers = {
      'Cache-Control': cacheControl,
      'Expires': expires,
      'Last-Modified': lastModified,
      'ETag': eTag
    };
    
    // 分析缓存策略
    const analysis: string[] = [];
    let cacheType = '无缓存';
    let cacheDuration = '';
    
    // 分析Cache-Control
    if (cacheControl) {
      const directives = cacheControl.split(',').map(d => d.trim());
      
      if (directives.includes('no-store')) {
        analysis.push('设置了 no-store: 不允许缓存任何响应内容');
        cacheType = '禁止缓存';
      } else if (directives.includes('no-cache')) {
        analysis.push('设置了 no-cache: 可以缓存，但使用前必须验证有效性');
        cacheType = '验证缓存';
      } else {
        // 查找max-age
        const maxAgeMatch = directives.find(d => d.startsWith('max-age='));
        if (maxAgeMatch) {
          const maxAge = parseInt(maxAgeMatch.split('=')[1]);
          cacheDuration = formatDuration(maxAge);
          analysis.push(`设置了 Cache-Control: Max-Age=${maxAge} - 响应可以缓存 ${cacheDuration}`);
          cacheType = '强缓存';
        }
        
        // 查找 s-maxage
        const sMaxAgeMatch = directives.find(d => d.startsWith('s-maxage='));
        if (sMaxAgeMatch) {
          const sMaxAge = parseInt(sMaxAgeMatch.split('=')[1]);
          analysis.push(`设置了 s-maxage=${sMaxAge}: 共享缓存可以缓存 ${formatDuration(sMaxAge)}`);
        }
        
        // 查找public / private
        if (directives.includes('public')) {
          analysis.push('设置了 public: 响应可以被任何缓存存储');
        } else if (directives.includes('private')) {
          analysis.push('设置了 private: 响应只能被单个用户的浏览器缓存');
        }
      }
    }
    
    // 分析Expires
    if (expires && cacheType !== '禁止缓存') {
      try {
        const expireDate = new Date(expires);
        const now = new Date();
        const diffSeconds = Math.floor((expireDate.getTime() - now.getTime()) / 1000);
        
        if (diffSeconds > 0) {
          analysis.push(`设置了 Expires: 响应将在 ${expires} 过期（${formatDuration(diffSeconds)}后）`);
          if (cacheType === '无缓存') {
            cacheType = '强缓存';
            cacheDuration = formatDuration(diffSeconds);
          }
        } else {
          analysis.push(`设置了 Expires: 响应已过期（过期时间：${expires}）`);
        }
      } catch (error) {
        analysis.push(`Expires 日期格式无效: ${expires} ${error instanceof Error ? error.message : '未知错误'}`);
      }
    }
    
    // 分析Last-Modified和ETag（验证缓存）
    if ((lastModified || eTag) && cacheType !== '禁止缓存') {
      if (cacheType === '无缓存') {
        cacheType = '验证缓存';
      }
      
      if (lastModified) {
        analysis.push(`设置了 Last-Modified: 服务器资源最后修改时间为 ${lastModified}`);
      }
      
      if (eTag) {
        analysis.push(`设置了 ETag: 资源标识为 ${eTag}`);
      }
    }
    
    // 生成摘要
    let summary = `缓存策略: ${cacheType}`;
    if (cacheDuration) {
      summary += `，有效期: ${cacheDuration}`;
    }
    
    if (cacheType === '验证缓存') {
      summary += '。使用前需要向服务器验证资源是否发生变化。';
    }
    
    result.summary = summary;
    result.details = analysis;
    
    // 返回格式化的JSON字符串
    return JSON.stringify(result, null, 2);
  } catch (error) {
    throw new Error(`HTTP缓存解读失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

// 格式化秒数为易读的时间
function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} 秒`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes} 分 ${remainingSeconds} 秒` : `${minutes} 分`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    return remainingMinutes > 0 ? `${hours} 小时 ${remainingMinutes} 分` : `${hours} 小时`;
  } else {
    const days = Math.floor(seconds / 86400);
    const remainingHours = Math.floor((seconds % 86400) / 3600);
    return remainingHours > 0 ? `${days} 天 ${remainingHours} 小时` : `${days} 天`;
  }
}