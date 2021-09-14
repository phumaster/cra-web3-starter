import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import ChainIds from '../configs/chainIds';

import { RPC_URLS, POLLING_INTERVAL } from './constants';

export const injected = new InjectedConnector({
  supportedChainIds: [
    ChainIds.BSC_MAINNET,
    ChainIds.BSC_TESTNET,
    ChainIds.MATIC_TESTNET,
    ChainIds.KCC_TESTNET,
    ChainIds.ETH_MAINNET,
    ChainIds.MATIC_MAINNET,
    ChainIds.KCC_MAINNET,
  ],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
