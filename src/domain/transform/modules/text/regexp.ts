export function regexMatch(regExp: string, input: string) {
  try {
    const regex = new RegExp(regExp);
    console.log(regex);
    const match = regex.exec(input);
    if (match) {
      console.log(match);
      return match.map((item) => item) || ['未匹配到内容'];
    } else {
      return ['未匹配到内容'];
    }
  } catch (error) {
    return ['未匹配到内容', error];
  }
}
