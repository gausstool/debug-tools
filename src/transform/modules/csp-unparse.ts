export function cspUnparse(input: string) {
  try {
    // 解析JSON字符串为JavaScript对象
    const cspObject: Record<string, string[]> = JSON.parse(input);
    
    // 构建CSP策略字符串
    const directives: string[] = [];
    
    // 遍历对象的每个键值对
    for (const [directiveName, directiveValues] of Object.entries(cspObject)) {
      if (Array.isArray(directiveValues) && directiveValues.length > 0) {
        // 连接指令名和指令值
        const directive = `${directiveName} ${directiveValues.join(' ')}`;
        directives.push(directive);
      }
    }
    
    // 用分号连接所有指令，并添加Content-Security-Policy前缀
    const cspString = `Content-Security-Policy: ${directives.join('; ')}`;
    
    return cspString;
  } catch (error) {
    throw new Error(`CSP逆解析失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}