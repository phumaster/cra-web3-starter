import AppConfigs from '@/configs';
import INetworkInfo from '@/types/INetworkInfo';

import useChainId from './useChainId';

function useChain(): INetworkInfo {
  const chainId = useChainId();
  return AppConfigs.networks.supportedNetworks[chainId];
}

export default useChain;
