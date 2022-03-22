import { useWeb3React } from '@web3-react/core';
import { useRecoilState } from 'recoil';

import AppConfigs from '@/configs';
import ChainIds from '@/configs/chain-ids';
import { getChainIdFromUri } from '@/utils/web3';

import chainIdState from '../states/chainId';

function useChainId(): ChainIds {
  const { chainId } = useWeb3React();
  const [chain] = useRecoilState(chainIdState);
  const chainFromUri = getChainIdFromUri();
  return chain || chainId || chainFromUri || AppConfigs.networks.CHAIN_ID;
}

export default useChainId;
