export function cspParse(input: string) {
  try {
    // 提取CSP内容，移除可能的前缀
    let cspContent = input.trim();
    if (cspContent.startsWith('Content-Security-Policy:')) {
      cspContent = cspContent.replace('Content-Security-Policy:', '').trim();
    }

    // 构建结果对象
    const result: Record<string, string[]> = {};

    // 按分号分割不同的指令
    const directives = cspContent.split(';');
    
    for (const directive of directives) {
      const trimmed = directive.trim();
      if (!trimmed) continue;
      
      // 按空格分割指令名和指令值
      const parts = trimmed.split(/\s+/);
      if (parts.length < 1) continue;
      
      const directiveName = parts[0];
      const directiveValues = parts.slice(1);
      
      // 处理引号包围的值，保留原始引号
      const processedValues: string[] = [];
      let currentQuotedValue: string | null = null;
      let currentQuoteType: string | null = null;
      
      for (const value of directiveValues) {
        // 检查是否开始引号
        if (!currentQuotedValue && (value.startsWith("'") || value.startsWith('"'))) {
          currentQuoteType = value[0];
          
          // 如果引号在同一行闭合
          if (value.endsWith(currentQuoteType)) {
            // 保留完整的引号值
            processedValues.push(value);
          } else {
            currentQuotedValue = value;
          }
        } 
        // 检查是否继续引号内容
        else if (currentQuotedValue) {
          if (value.endsWith(currentQuoteType!)) {
            // 引号闭合，保留完整的引号值
            currentQuotedValue += ' ' + value;
            processedValues.push(currentQuotedValue);
            currentQuotedValue = null;
            currentQuoteType = null;
          } else {
            // 引号内容继续
            currentQuotedValue += ' ' + value;
          }
        } 
        // 普通值
        else {
          processedValues.push(value);
        }
      }
      
      // 添加到结果对象
      if (processedValues.length > 0) {
        result[directiveName] = processedValues;
      }
    }

    // 返回格式化的JSON字符串
    return JSON.stringify(result, null, 2);
  } catch (error) {
    throw new Error(`CSP解析失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}