import { chain, Chain } from 'wagmi';

export const DEFAULT_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID as string, 10);

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
};

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.ftm.tools',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
};

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' };

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    default: 'https://bsc-dataseed1.binance.org',
    ninicoin: 'https://bsc-dataseed1.ninicoin.io',
    defibit: 'https://bsc-dataseed1.defibit.io',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  multicall: {
    address: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
    blockCreated: 6564393,
  },
};

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  multicall: {
    address: '0xb66a4fE12138C4391A98F29E34EFE4Cc7A445AE5',
    blockCreated: 21965366,
  },
  testnet: true,
};

export const wagmiChains = [chain.mainnet, bsc, avalandche, fantomOpera, bscTest];
