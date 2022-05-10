import IToken from 'types/IToken';
import chainInfo from 'utils/chain-info';

import useChainId from './useChainId';

function useNativeToken(): Pick<IToken, 'name' | 'symbol' | 'decimals'> {
  const chainId = useChainId();
  return chainInfo.chains[chainId].currency;
}

export default useNativeToken;
