export const languageMap: Record<string, () => Promise<any>> = {
  javascript: async () => (await import('@codemirror/lang-javascript')).javascript,
  json: async () => (await import('@codemirror/lang-json')).json,
  yaml: async () => (await import('@codemirror/lang-yaml')).yaml,
  sql: async () => (await import('@codemirror/lang-sql')).sql
};

export function getLanguageExtension(language: string) {
  const languageLoader = languageMap[language] || languageMap['javascript'];
  return languageLoader();
}