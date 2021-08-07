interface WindowChain {
  ethereum?: {
    isMetaMask?: true;
    request?: (...args: any[]) => void;
  };
}

declare module '@web3-react/walletconnect-connector';
declare module '@ethersproject/providers';
