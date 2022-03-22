import { useMemo } from 'react';

import AppConfigs from '@/configs';

import useChainId from './useChainId';

function useExplorer(): string {
  const chainId = useChainId();
  return useMemo(() => AppConfigs.networks.supportedNetworks[chainId].blockExplorerUrls[0], [chainId]);
}

export default useExplorer;
