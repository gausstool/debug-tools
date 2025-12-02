export function textSort(input: string) {
  return input
    .split('\n')
    .sort((a, b) => a.localeCompare(b))
    .join('\n');
}
