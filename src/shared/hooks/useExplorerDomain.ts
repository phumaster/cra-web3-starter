import AppConfigs from '@/configs';
import { useMemo } from 'react';
import useChainId from './useChainId';

function useExplorerDomain(): string {
  const chainId = useChainId();
  return useMemo(() => AppConfigs.networks.supportedNetworks[chainId].blockExplorerUrls[0], [chainId]);
}

export default useExplorerDomain;
