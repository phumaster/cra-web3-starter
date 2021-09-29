/* eslint-disable @typescript-eslint/no-explicit-any */
import IcBsc from '../assets/icons/bsc.svg';
import IcEth from '../assets/icons/eth.svg';
import ChainIds from './chain-ids';

export function orThrow(message: string): any {
  throw new Error(message);
}

const networks = {
  CHAIN_ID: parseInt(process.env.REACT_APP_CHAIN_ID ?? orThrow('CHAIN_ID must be define'), 10),
  rpcUrls: [
    'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213',
  ],
  supportedNetworks: {
    [ChainIds.ETH_MAINNET]: {
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
    },
    [ChainIds.BSC_MAINNET]: {
      name: 'Binance Smart Chain Mainnet',
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
    },
    [ChainIds.BSC_TESTNET]: {
      name: 'Binance Smart Chain Testnet',
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
    },
  },
};

export default networks;
