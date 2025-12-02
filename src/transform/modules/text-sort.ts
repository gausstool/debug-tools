export function textSort(input: string) {
  return input
    .split('\n')
    .filter(line => line.trim() !== '')
    .sort((a, b) => a.localeCompare(b))
    .join('\n');
}
