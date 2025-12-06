// SQL压缩工具：将多行SQL压缩成一行

import { sqlFormat } from "./sql-format";

export async function sqlCompress(input: string): Promise<string> {
  try {
    if (!input || input.trim() === '') {
      return '';
    }

    let result = await sqlFormat(input);
    
    // 1. 移除块注释 /* ... */
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // 2. 移除行注释 -- 到行尾
    result = result.replace(/--.*$/gm, '');
    
    // 3. 处理字符串中的换行和空格（暂时用占位符替换）
    const stringPlaceholders: string[] = [];
    result = result.replace(/'(?:[^'\\]|\\.)*'/g, (match) => {
      const placeholder = `__STRING_PLACEHOLDER_${stringPlaceholders.length}__`;
      stringPlaceholders.push(match);
      return placeholder;
    });
    
    // 4. 移除所有换行符和制表符
    result = result.replace(/[\n\t\r]+/g, ' ');
    
    // 5. 压缩多个空格为一个
    result = result.replace(/\s+/g, ' ');
    
    // 6. 移除SQL语句前后的空格
    result = result.trim();
    
    // 7. 恢复字符串占位符
    stringPlaceholders.forEach((originalString, index) => {
      result = result.replace(`__STRING_PLACEHOLDER_${index}__`, originalString);
    });
    
    return result;
  } catch (error) {
    console.error('SQL压缩失败:', error);
    throw new Error(`SQL压缩失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}