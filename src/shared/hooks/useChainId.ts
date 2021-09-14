import { useWeb3React } from '@web3-react/core';
import { useRecoilState } from 'recoil';

import AppConfigs from '../../configs';
import { getChainIdFromUri } from '../../utils/helper';
import chainIdState from '../states/chainId';

function useChainId(): number {
  const { chainId } = useWeb3React();
  const [chain] = useRecoilState(chainIdState);
  const chainFromUri = getChainIdFromUri();
  return chain || chainId || chainFromUri || AppConfigs.networks.CHAIN_ID;
}

export default useChainId;
