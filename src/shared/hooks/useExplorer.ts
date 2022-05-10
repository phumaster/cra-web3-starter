import { useMemo } from 'react';

import chainInfo from 'utils/chain-info';

import useChainId from './useChainId';

function useExplorer(): string {
  const chainId = useChainId();
  return useMemo(() => chainInfo.chains[chainId].blockExplorerUrls[0], [chainId]);
}

export default useExplorer;
