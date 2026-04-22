export async function cssToSass(input: string): Promise<string> {
  const lines = input.split('\n');
  const result: string[] = [];
  const selectorStack: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      result.push('');
      continue;
    }

    if (trimmed.includes('{')) {
      const selector = trimmed.split('{')[0].trim();
      const selectorParts = selector.split(' ').filter(part => part.trim() !== '');
      
      // 处理嵌套选择器
      if (selectorParts.length > 1) {
        // 找到与上一个选择器的公共部分
        let commonParts = 0;
        const lastSelector = selectorStack[selectorStack.length - 1];
        if (lastSelector) {
          const lastParts = lastSelector.split(' ').filter(part => part.trim() !== '');
          while (commonParts < Math.min(lastParts.length, selectorParts.length) && 
                 lastParts[commonParts] === selectorParts[commonParts]) {
            commonParts++;
          }
        }
        
        // 闭合多余的块
        for (let i = selectorStack.length - 1; i >= commonParts; i--) {
          result.push('  '.repeat(i) + '');
          selectorStack.pop();
        }
        
        // 添加新的选择器部分
        for (let i = commonParts; i < selectorParts.length; i++) {
          result.push('  '.repeat(i) + selectorParts[i]);
          selectorStack.push(selectorParts.slice(0, i + 1).join(' '));
        }
      } else {
        // 简单选择器
        if (selectorStack.length > 0 && selector !== selectorStack[selectorStack.length - 1]) {
          // 闭合之前的块
          for (let i = selectorStack.length - 1; i >= 0; i--) {
            result.push('  '.repeat(i) + '');
          }
          selectorStack.length = 0;
        }
        result.push(selector);
        selectorStack.push(selector);
      }
    } else if (trimmed.includes('}')) {
      // 忽略 CSS 的闭合括号，因为我们已经通过嵌套结构处理了
    } else {
      // 处理属性
      const property = trimmed.replace(/;$/, '').trim();
      if (property) {
        result.push('  '.repeat(selectorStack.length) + property);
      }
    }
  }

  // 闭合所有剩余的块
  for (let i = selectorStack.length - 1; i >= 0; i--) {
    result.push('  '.repeat(i) + '');
  }

  return result.join('\n');
}