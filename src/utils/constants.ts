import networks from '../configs/networks';
import ChainIds from '../configs/chain-ids';

const { supportedNetworks } = networks;

export const POLLING_INTERVAL = 12000;

export const RPC_URLS: { [chainId: number]: string } = {
  1: supportedNetworks[ChainIds.BSC_MAINNET].rpcUrls[0],
  4: supportedNetworks[ChainIds.BSC_MAINNET].rpcUrls[1],
};

export enum ConnectorNames {
  Injected = 'Injected',
  TrustWallet = 'TrustWallet',
  SafePad = 'SafePad',
  WalletConnect = 'WalletConnect',
}
