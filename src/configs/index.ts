import { MaxUint256 } from '@ethersproject/constants';

import links from './links';
import storage from './storage';
import theme from './theme';
import info from './info';
import { supportedChains, DEFAULT_CHAIN_ID, chains } from './chain';

const AppConfigs = {
  links,
  storage,
  theme,
  info,
  supportedChains,
  chains,
  DEFAULT_CHAIN_ID,
  MAX_APPROVE: MaxUint256.toString(),
};

export default AppConfigs;
