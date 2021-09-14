/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import useChainId from './useChainId';

export function useAccountBalance(): string | undefined {
  const { account, library } = useWeb3React();
  const chainId = useChainId();
  const [balance, setBalance] = useState<string>();
  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;
      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(undefined);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]);

  return balance ? (balance || '').toString() : balance;
}

export default useAccountBalance;
