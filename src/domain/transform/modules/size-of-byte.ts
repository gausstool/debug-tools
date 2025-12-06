export function sizeofByte(str: string) {
  let utf8Total = 0;
  let utf16Total = 0;

  for (let i = 0, len = str.length; i < len; ) {
    const charCode = str.codePointAt(i) as number;
    
    // 计算 UTF-8 字节数
    if (charCode <= 0x007f) {
      utf8Total += 1;
    } else if (charCode <= 0x07ff) {
      utf8Total += 2;
    } else if (charCode <= 0xffff) {
      utf8Total += 3;
    } else {
      utf8Total += 4;
    }

    // 计算 UTF-16 字节数
    if (charCode <= 0xffff) {
      utf16Total += 2;
      i++;
    } else {
      utf16Total += 4;
      i += 2;
    }
  }

  return JSON.stringify(
    {
      chars: str.length,
      utf8Bytes: utf8Total,
      utf16Bytes: utf16Total,
    },
    null,
    2
  );
}
