import AppConfigs from 'configs';
import { useMemo } from 'react';

import useChainId from './useChainId';

function useExplorer(): string {
  const chainId = useChainId();
  return useMemo(() => AppConfigs.chains[chainId].blockExplorerUrls[0], [chainId]);
}

export default useExplorer;
