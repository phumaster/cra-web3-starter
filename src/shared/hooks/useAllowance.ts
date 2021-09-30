/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import useWeb3 from './useWeb3';
import useChainId from './useChainId';
import multicall from '@/utils/multicall';
import erc20Abi from '../../abi/erc20.json';
import useDebounce from './useDebounce';

function useAllowance(address?: string): string | undefined {
  const [value, setValue] = useState<string>();
  const web3 = useWeb3();
  const chainId = useChainId();
  const { account } = useWeb3React();

  const getAllowance = useCallback(() => {
    if (!address || !account) return;
    (async () => {
      try {
        const [[allowance]] = await multicall(
          erc20Abi,
          [
            {
              name: 'allowance',
              address,
              params: [account, address],
            },
          ],
          { web3 },
          chainId,
        );
        setValue(allowance.toString());
      } catch (e) {
        //
      }
    })();
  }, [account, address, chainId, web3]);

  useDebounce(getAllowance, 300, [getAllowance]);

  return value;
}

export default useAllowance;
