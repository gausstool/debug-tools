import { encode, decode } from 'js-base64'
export function encodeBase64(input: string) {
    return encode(input);
}

export function decodeBase64(input: string) {
    return decode(input);
}
