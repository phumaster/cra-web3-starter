import { useWeb3React } from '@web3-react/core';
import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import { BigNumber } from '@ethersproject/bignumber';

import multicall from '@/utils/multicall';
import erc20Abi from '@/abi/erc20.json';

import useWeb3 from './useWeb3';
import useChainId from './useChainId';

function useAllowance(address?: string): AsyncState<undefined | BigNumber> {
  const web3 = useWeb3();
  const chainId = useChainId();
  const { account } = useWeb3React();

  const state = useAsync(async () => {
    if (!address || !account) return undefined;
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
    return allowance;
  }, [address, web3, chainId]);

  return state;
}

export default useAllowance;
