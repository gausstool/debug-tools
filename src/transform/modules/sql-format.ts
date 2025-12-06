export async function sqlFormat(input: string): Promise<string> {
  const { format } = await import('sql-formatter');
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
}
