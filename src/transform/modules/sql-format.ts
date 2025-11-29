import { format } from 'sql-formatter';

export function sqlFormat(input: string): string {
  try {
    // 使用sql-formatter库格式化SQL，设置一些常见的配置选项
    return format(input, {
      language: 'sql',
      tabWidth: 2,
      keywordCase: 'upper',
      dataTypeCase: 'upper',
      functionCase: 'lower',
      logicalOperatorNewline: 'after',
      expressionWidth: 120,
      linesBetweenQueries: 1,
    });
  } catch (error) {
    // 如果格式化失败，返回原始输入并添加错误信息
    console.error('SQL格式化失败:', error);
    throw new Error(`SQL格式化失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}