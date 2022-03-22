import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { injected } from '@/utils/connectors';

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState<boolean>(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export default useEagerConnect;
