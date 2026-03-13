import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export type UUIDVersion = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7';

function hex(byte: number): string {
  return byte.toString(16).padStart(2, '0');
}

function bytesToHex(bytes: number[]): string {
  return bytes.map(hex).join('');
}

function generateRandomBytes(length: number): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < length; i++) {
    bytes.push(Math.floor(Math.random() * 256));
  }
  return bytes;
}

function setVersionAndVariant(bytes: number[], version: number): void {
  bytes[6] = (bytes[6] & 0x0f) | (version << 4);
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
}

function formatUUID(bytes: number[]): string {
  const hex = bytesToHex(bytes);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export function generateUUIDv1(): string {
  return uuidv1();
}

export function generateUUIDv2(): string {
  const bytes = generateRandomBytes(16);
  const timestamp = Date.now();
  
  bytes[0] = (timestamp & 0xff);
  bytes[1] = ((timestamp >> 8) & 0xff);
  bytes[2] = ((timestamp >> 16) & 0xff);
  bytes[3] = ((timestamp >> 24) & 0xff);
  bytes[4] = ((timestamp >> 32) & 0xff);
  bytes[5] = ((timestamp >> 40) & 0xff);
  bytes[6] = ((timestamp >> 48) & 0xff);
  
  const clockSeq = Math.floor(Math.random() * 16384);
  bytes[7] = (clockSeq >> 8) & 0xff;
  bytes[8] = clockSeq & 0xff;
  
  setVersionAndVariant(bytes, 2);
  
  return formatUUID(bytes);
}

export function generateUUIDv3(namespace: string, name: string): string {
  return uuidv3(name, namespace);
}

export function generateUUIDv4(): string {
  return uuidv4();
}

export function generateUUIDv5(namespace: string, name: string): string {
  return uuidv5(name, namespace);
}

export function generateUUIDv6(): string {
  const bytes = generateRandomBytes(16);
  const timestamp = Date.now();
  
  const timeHigh = ((timestamp >> 28) & 0x0f) | 0x60;
  const timeMid = (timestamp >> 16) & 0xff;
  const timeLow = timestamp & 0xffff;
  
  bytes[0] = (timeHigh >> 8) & 0xff;
  bytes[1] = timeHigh & 0xff;
  bytes[2] = (timeMid >> 8) & 0xff;
  bytes[3] = timeMid & 0xff;
  bytes[4] = (timeLow >> 8) & 0xff;
  bytes[5] = timeLow & 0xff;
  
  const clockSeq = Math.floor(Math.random() * 16384);
  bytes[7] = (clockSeq >> 8) & 0xff;
  bytes[8] = clockSeq & 0xff;
  
  setVersionAndVariant(bytes, 6);
  
  return formatUUID(bytes);
}

export function generateUUIDv7(): string {
  const bytes = generateRandomBytes(16);
  const timestamp = Date.now();
  
  const timeHigh = (timestamp >> 16) & 0xff;
  const timeMid = (timestamp >> 8) & 0xff;
  const timeLow = timestamp & 0xff;
  
  bytes[0] = timeHigh;
  bytes[1] = timeMid;
  bytes[2] = timeLow;
  
  setVersionAndVariant(bytes, 7);
  
  return formatUUID(bytes);
}

export async function generateUUID(
  version: UUIDVersion,
  namespace?: string,
  name?: string,
  includeDashes: boolean = true
): Promise<string> {
  let uuid: string;
  
  switch (version) {
  case 'v1':
    uuid = generateUUIDv1();
    break;
  case 'v2':
    uuid = generateUUIDv2();
    break;
  case 'v3':
    if (!namespace || !name) {
      throw new Error('UUID v3 需要 namespace 和 name 参数');
    }
    uuid = generateUUIDv3(namespace, name);
    break;
  case 'v4':
    uuid = generateUUIDv4();
    break;
  case 'v5':
    if (!namespace || !name) {
      throw new Error('UUID v5 需要 namespace 和 name 参数');
    }
    uuid = generateUUIDv5(namespace, name);
    break;
  case 'v6':
    uuid = generateUUIDv6();
    break;
  case 'v7':
    uuid = generateUUIDv7();
    break;
  default:
    throw new Error(`不支持的 UUID 版本: ${version}`);
  }
  
  return includeDashes ? uuid : uuid.replace(/-/g, '');
}
