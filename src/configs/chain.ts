import IChainInfo from 'types/IChainInfo';

import IcBsc from '../assets/icons/bsc.svg';
import IcEth from '../assets/icons/eth.svg';

export function orThrow(message: string): unknown {
  throw new Error(message);
}

enum ChainIds {
  ETH_MAINNET = 1,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
}

export const DEFAULT_CHAIN_ID = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? (orThrow('CHAIN_ID must be define') as string),
  10,
);

export const supportedChains: IChainInfo[] = [
  {
    name: 'Ethereum Mainnet',
    shortName: 'ETH',
    chainId: ChainIds.ETH_MAINNET,
    icon: IcEth,
    currency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/20e078e98de64af88b26c6b1bb47f822'],
    blockExplorerUrls: ['https://etherscan.io'],
    type: 'mainnet',
    contracts: {
      multicall: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    },
  },
  {
    name: 'BNB Chain',
    shortName: 'BSC',
    chainId: ChainIds.BSC_MAINNET,
    icon: IcBsc,
    currency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed.binance.org',
    ],
    blockExplorerUrls: ['https://bscscan.com'],
    type: 'mainnet',
    contracts: {
      multicall: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
    },
  },
  {
    name: 'BNB Chain Testnet',
    shortName: 'BSC-Test',
    chainId: ChainIds.BSC_TESTNET,
    icon: IcBsc,
    currency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
    ],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
    type: 'testnet',
    contracts: {
      multicall: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
    },
  },
];

export default ChainIds;
