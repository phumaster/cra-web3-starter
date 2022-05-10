interface WindowChain {
  ethereum?: {
    isMetaMask?: true;
    request?: (...args: unknown[]) => void;
  };
}

declare module '@web3-react/walletconnect-connector';
declare module '@ethersproject/providers';
declare module 'react-helmet';

declare module "*.json" 
{
    const value: any;
    export default value;
}
