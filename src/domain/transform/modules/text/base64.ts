export async function encodeBase64(input: string) {
  const { encode } = await import('js-base64');
  return encode(input);
}

export async function decodeBase64(input: string) {
  const { decode } = await import('js-base64');
  return decode(input);
}
