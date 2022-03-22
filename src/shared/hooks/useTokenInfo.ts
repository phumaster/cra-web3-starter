import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';

import IToken from '@/types/IToken';
import multicall from '@/utils/multicall';
import erc20Abi from '@/abi/erc20.json';

import useWeb3 from './useWeb3';
import useChainId from './useChainId';

function useTokenInfo(address?: string): AsyncState<undefined | IToken> {
  const web3 = useWeb3();
  const chainId = useChainId();

  const state = useAsync(async () => {
    if (!address) return undefined;
    const [[name], [symbol], [decimals], [totalSupply]] = await multicall(
      erc20Abi,
      ['name', 'symbol', 'decimals', 'totalSupply'].map((method) => ({ name: method, address })),
      { web3 },
      chainId,
    );
    return {
      name,
      symbol,
      decimals: Number(decimals.toString()),
      totalSupply: totalSupply.toString(),
    };
  }, [web3, chainId, address]);

  return state;
}

export default useTokenInfo;
