import { useWeb3React } from '@web3-react/core';
import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import { BigNumber } from '@ethersproject/bignumber';

import useChainId from './useChainId';

export function useAccountBalance(): AsyncState<undefined | BigNumber> {
  const { account, library } = useWeb3React();
  const chainId = useChainId();

  const state = useAsync(async () => {
    if (!account || !library) return undefined;
    const balance = await library.getBalance(account);
    return balance;
  }, [account, library, chainId]);

  return state;
}

export default useAccountBalance;
