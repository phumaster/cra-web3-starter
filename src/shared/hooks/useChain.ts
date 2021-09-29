import useChainId from './useChainId';
import AppConfigs from '../../configs';
import INetworkInfo from '@/types/INetworkInfo';

function useChain(): INetworkInfo {
  const chainId = useChainId();
  return AppConfigs.networks.supportedNetworks[chainId];
}

export default useChain;
