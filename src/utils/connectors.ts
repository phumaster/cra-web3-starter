/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import AppConfigs from '../configs';
import ChainIds from '../configs/chain';

import { POLLING_INTERVAL } from './constants';

export const injected = new InjectedConnector({
  supportedChainIds: [ChainIds.BSC_MAINNET, ChainIds.BSC_TESTNET, ChainIds.ETH_MAINNET],
});

export function coinbaseWallet(chainId?: ChainIds) {
  return new WalletLinkConnector({
    url: AppConfigs.chains[chainId || ChainIds.BSC_MAINNET].rpcUrls[0],
    appName: AppConfigs.info.APP_NAME,
    appLogoUrl: AppConfigs.info.APP_LOGO_URL,
    supportedChainIds: [chainId || ChainIds.BSC_MAINNET],
  });
}

export function walletconnect(chainId?: ChainIds) {
  return new WalletConnectConnector({
    rpc: {
      [chainId || ChainIds.BSC_MAINNET]: AppConfigs.chains[chainId || ChainIds.BSC_MAINNET].rpcUrls[0],
    },
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  });
}
