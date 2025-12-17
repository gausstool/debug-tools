function textSplit(input: string, separator: string) {
  return JSON.stringify(input.split(separator), null, 2);
}

export function semiSplit(input: string) {
  return textSplit(input, ';');
}

export function commaSplit(input: string) {
  return textSplit(input, ',');
}

export function lineSplit(input: string) {
  return textSplit(input, '\n');
}
