import AppConfigs from 'configs';
import IChainInfo from 'types/IChainInfo';

import useChainId from './useChainId';

function useChain(): IChainInfo {
  const chainId = useChainId();
  return AppConfigs.chains[chainId];
}

export default useChain;
