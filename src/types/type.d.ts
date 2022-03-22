interface WindowChain {
  ethereum?: {
    isMetaMask?: true;
    request?: (...args: unknown[]) => void;
  };
}

declare module '@web3-react/walletconnect-connector';
declare module '@ethersproject/providers';
