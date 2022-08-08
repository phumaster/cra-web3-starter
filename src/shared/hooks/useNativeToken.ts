import AppConfigs from 'configs';
import IToken from 'types/IToken';

import useChainId from './useChainId';

function useNativeToken(): Pick<IToken, 'name' | 'symbol' | 'decimals'> {
  const chainId = useChainId();
  return AppConfigs.chains[chainId].currency;
}

export default useNativeToken;
