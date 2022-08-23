import ConnectorNames from 'types/ConnectorNames';

const connectors = [
  {
    title: 'Metamask',
    icon: '',
    connectorId: ConnectorNames.MetaMask,
    priority: 1,
    href: 'https://metamask.app.link/dapp/example.com/',
  },
  {
    title: 'Coinbase Wallet',
    icon: '',
    connectorId: ConnectorNames.WalletLink,
    priority: 2,
  },
  {
    title: 'Trust Wallet',
    icon: '',
    connectorId: ConnectorNames.Injected,
    priority: 3,
    href: 'https://link.trustwallet.com/open_url?coin_id=1&url=https://example.com/',
  },
  {
    title: 'WalletConnect',
    icon: '',
    connectorId: ConnectorNames.WalletConnect,
    priority: 4,
  },
];

export default connectors;
