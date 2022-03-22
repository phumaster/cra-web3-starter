export function orThrow(message: string): Error {
  throw new Error(message);
}

export function getExplorerLink(domain: string, address: string): { address: string; token: string } {
  return {
    address: `${domain}/address/${address}`,
    token: `${domain}/token/${address}`,
  };
}
