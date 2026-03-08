interface SrtOptions {
  keepLineBreaks?: boolean;
  joinWith?: string;
}
/**
 * 将 SRT 字幕内容转换为纯文本
 * @param {string} srtContent - SRT 格式的字幕内容
 * @param {Object} options - 可选配置项
 * @param {boolean} options.keepLineBreaks - 是否保留字幕内的换行符，默认 false（替换为空格）
 * @param {string} options.joinWith - 多条字幕之间的连接符，默认 '\n\n'
 * @returns {string} 提取后的纯文本
 */
export function srtToPlainText(srtContent: string, options: SrtOptions = {}) {
  const { keepLineBreaks = false, joinWith = '' } = options;

  // 如果输入为空，直接返回空字符串
  if (typeof srtContent !== 'string' || srtContent.trim() === '') {
    return '';
  }

  // 按空行分割每个字幕块（支持 Windows \r\n 和 Linux/mac \n 换行）
  const blocks = srtContent.trim().split(/\r?\n\s*\r?\n/);

  const textParts = [];

  for (const block of blocks) {
    const lines = block.split(/\r?\n/);

    // 至少需要三行：序号、时间轴、字幕文本（可能有更多行文本）
    if (lines.length < 3) continue;

    // 跳过序号行（第一行）
    // 跳过时间轴行（第二行）
    // 剩下的都是字幕文本行
    const textLines = lines.slice(2);

    // 过滤掉可能出现的空行（比如时间轴后紧跟空行，但通常不会）
    const nonEmptyTextLines = textLines.filter(line => line.trim() !== '');

    if (nonEmptyTextLines.length === 0) continue;

    // 根据配置处理字幕内换行：保留或替换为空格
    let blockText;
    if (keepLineBreaks) {
      blockText = nonEmptyTextLines.join('\n');
    } else {
      // 将多行文本合并为一行，用空格连接
      blockText = nonEmptyTextLines.join(' ');
    }

    textParts.push(blockText);
  }

  // 使用指定的连接符拼接所有字幕块
  return textParts.join(joinWith);
}
