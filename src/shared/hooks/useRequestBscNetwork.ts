import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

import { requestBscNetwork } from 'utils/web3';

function useRequestBscNetwork(): void {
  const { connector, error, activate } = useWeb3React();
  useEffect(() => {
    if (!error || !connector) return;
    if (error instanceof UnsupportedChainIdError) {
      requestBscNetwork().then((requested) => {
        if (requested) {
          activate(connector);
        }
      });
    }
  }, [error, connector, activate]);
}

export default useRequestBscNetwork;
