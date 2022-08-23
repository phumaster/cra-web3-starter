import { configureChains, createClient } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

import { wagmiChains } from 'configs/networks';

export const { provider, chains } = configureChains(wagmiChains, [publicProvider()]);

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
});

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'Hello',
    appLogoUrl: 'https://example.com/logo.png',
  },
});

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
});

export const client = createClient({
  autoConnect: true,
  provider,
  connectors: [metaMaskConnector, injectedConnector, coinbaseConnector, walletConnectConnector],
});
