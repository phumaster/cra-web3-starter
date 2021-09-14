import useChainId from './useChainId';
import IcBsc from '../../assets/icons/bsc.svg';
import IcEth from '../../assets/icons/eth.svg';
import IcMatic from '../../assets/icons/matic.png';
import IcKcs from '../../assets/icons/kcs.png';
import ChainIds from '../../configs/chainIds';

function useChain(): {
  name: string;
  icon: string | null;
  family: string | null;
} {
  const chainId = useChainId();
  switch (chainId) {
    case ChainIds.ETH_MAINNET:
      return {
        name: 'ETH MAINNET',
        icon: IcEth,
        family: 'eth',
      };
    case ChainIds.BSC_TESTNET:
      return {
        name: 'BSC TESTNET',
        icon: IcBsc,
        family: 'bsc',
      };
    case ChainIds.BSC_MAINNET:
      return {
        name: 'BSC MAINNET',
        icon: IcBsc,
        family: 'bsc',
      };
    case ChainIds.MATIC_TESTNET:
      return {
        name: 'MUMBAI',
        icon: IcMatic,
        family: 'matic',
      };
    case ChainIds.MATIC_MAINNET:
      return {
        name: 'MATIC MANNET',
        icon: IcMatic,
        family: 'matic',
      };
    case ChainIds.KCC_TESTNET:
      return {
        name: 'KCC TESTNET',
        icon: IcKcs,
        family: 'kucoin',
      };
    case ChainIds.KCC_MAINNET:
      return {
        name: 'KCC MAINNET',
        icon: IcKcs,
        family: 'kucoin',
      };
    default:
      return {
        name: 'Not support',
        icon: null,
        family: null,
      };
  }
}

export default useChain;
