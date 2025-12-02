export function textSort(input: string) {
    return input.split('\r\n').sort((a, b) => a.localeCompare(b)).filter(Boolean).join('\r\n');
}