import useChainId from './useChainId';
import IcBsc from '../../assets/icons/bsc.svg';
import IcEth from '../../assets/icons/eth.svg';
import IcMatic from '../../assets/icons/matic.png';
import IcKcs from '../../assets/icons/kcs.png';
import ChainIds from '../../configs/chainIds';

type Chain = {
  name: string;
  icon: string | null;
  family: string | null;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
};

function useChain(): Chain {
  const chainId = useChainId();
  switch (chainId) {
    case ChainIds.ETH_MAINNET:
      return {
        name: 'ETH MAINNET',
        icon: IcEth,
        family: 'eth',
        currency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18,
        },
      };
    case ChainIds.BSC_TESTNET:
      return {
        name: 'BSC TESTNET',
        icon: IcBsc,
        family: 'bsc',
        currency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18,
        },
      };
    case ChainIds.BSC_MAINNET:
      return {
        name: 'BSC MAINNET',
        icon: IcBsc,
        family: 'bsc',
        currency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18,
        },
      };
    case ChainIds.MATIC_TESTNET:
      return {
        name: 'MUMBAI',
        icon: IcMatic,
        family: 'matic',
        currency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
      };
    case ChainIds.MATIC_MAINNET:
      return {
        name: 'MATIC MANNET',
        icon: IcMatic,
        family: 'matic',
        currency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
      };
    case ChainIds.KCC_TESTNET:
      return {
        name: 'KCC TESTNET',
        icon: IcKcs,
        family: 'kucoin',
        currency: {
          name: 'KCS',
          symbol: 'KCS',
          decimals: 18,
        },
      };
    case ChainIds.KCC_MAINNET:
      return {
        name: 'KCC MAINNET',
        icon: IcKcs,
        family: 'kucoin',
        currency: {
          name: 'KCS',
          symbol: 'KCS',
          decimals: 18,
        },
      };
    default:
      return {
        name: 'Not support',
        icon: null,
        family: null,
        currency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18,
        },
      };
  }
}

export default useChain;
