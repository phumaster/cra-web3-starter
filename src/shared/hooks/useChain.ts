import IChainInfo from '@/types/IChainInfo';
import chainInfo from '@/utils/chain-info';

import useChainId from './useChainId';

function useChain(): IChainInfo {
  const chainId = useChainId();
  return chainInfo.chains[chainId];
}

export default useChain;
