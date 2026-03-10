export function randomPort(input: string, minPort: number = 1025, maxPort: number = 65535): number {
  if (minPort < 1 || minPort > 65535) {
    throw new Error('最小端口号必须在 1-65535 范围内');
  }
  if (maxPort < 1 || maxPort > 65535) {
    throw new Error('最大端口号必须在 1-65535 范围内');
  }
  if (minPort > maxPort) {
    throw new Error('最小端口号不能大于最大端口号');
  }
  
  let seed = 0;
  if (input.trim()) {
    for (let i = 0; i < input.length; i++) {
      seed = (seed * 31 + input.charCodeAt(i)) % 65536;
    }
  } else {
    seed = Math.floor(Math.random() * 65536);
  }
  
  const portRange = maxPort - minPort + 1;
  const randomPort = minPort + (seed % portRange);
  
  return randomPort;
}

export function randomPortString(input: string, minPort: number = 1025, maxPort: number = 65535): string {
  const port = randomPort(input, minPort, maxPort);
  return port.toString();
}