/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import IToken from '@/types/IToken';
import useWeb3 from './useWeb3';
import useChainId from './useChainId';
import multicall from '@/utils/multicall';
import erc20Abi from '../../abi/erc20.json';
import useDebounce from './useDebounce';

type TReturned = {
  value?: IToken;
  loading: boolean;
  error?: string;
};

function useTokenInfo(address?: string): TReturned {
  const [value, setValue] = useState<IToken>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const web3 = useWeb3();
  const chainId = useChainId();

  const getToken = useCallback(() => {
    if (!address) return;
    (async () => {
      setLoading(true);
      setError(undefined);
      try {
        const [[name], [symbol], [decimals], [totalSupply]] = await multicall(
          erc20Abi,
          ['name', 'symbol', 'decimals', 'totalSupply'].map((method) => ({ name: method, address })),
          { web3 },
          chainId,
        );
        setValue({
          name,
          symbol,
          decimals: Number(decimals.toString()),
          totalSupply: totalSupply.toString(),
        });
      } catch (e: any) {
        setError(e?.message ?? e.toString());
        setValue(undefined);
      } finally {
        setLoading(false);
      }
    })();
  }, [address, chainId, web3]);

  useDebounce(getToken, 300, [getToken]);

  return {
    loading,
    error,
    value,
  };
}

export default useTokenInfo;
