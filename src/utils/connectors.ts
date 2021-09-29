/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import AppConfigs from '../configs';
import ChainIds from '../configs/chain-ids';

import { POLLING_INTERVAL } from './constants';

export const injected = new InjectedConnector({
  supportedChainIds: [ChainIds.BSC_MAINNET, ChainIds.BSC_TESTNET, ChainIds.ETH_MAINNET],
});

export const walletconnect = (chainId?: ChainIds) => {
  switch (chainId) {
    case ChainIds.BSC_MAINNET:
      return new WalletConnectConnector({
        rpc: {
          [ChainIds.BSC_MAINNET]: AppConfigs.networks.supportedNetworks[ChainIds.BSC_MAINNET].rpcUrls[0],
        },
        qrcode: true,
        pollingInterval: POLLING_INTERVAL,
      });
    case ChainIds.BSC_TESTNET:
      return new WalletConnectConnector({
        rpc: {
          [ChainIds.BSC_TESTNET]: AppConfigs.networks.supportedNetworks[ChainIds.BSC_TESTNET].rpcUrls[0],
        },
        qrcode: true,
        pollingInterval: POLLING_INTERVAL,
      });
    case ChainIds.ETH_MAINNET:
      return new WalletConnectConnector({
        rpc: {
          [ChainIds.ETH_MAINNET]: AppConfigs.networks.supportedNetworks[ChainIds.ETH_MAINNET].rpcUrls[0],
        },
        qrcode: true,
        pollingInterval: POLLING_INTERVAL,
      });
    default:
      return new WalletConnectConnector({
        rpc: {
          [ChainIds.BSC_MAINNET]: AppConfigs.networks.supportedNetworks[ChainIds.BSC_MAINNET].rpcUrls[0],
        },
        qrcode: true,
        pollingInterval: POLLING_INTERVAL,
      });
  }
};
