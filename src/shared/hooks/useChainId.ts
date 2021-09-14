import { useWeb3React } from '@web3-react/core';
import { useRecoilState } from 'recoil';

import AppConfigs from '../../configs';
import chainIdState from '../states/chainId';

function useChainId(): number {
  const { chainId } = useWeb3React();
  const [chain] = useRecoilState(chainIdState);
  return chain || chainId || AppConfigs.networks.CHAIN_ID;
}

export default useChainId;
