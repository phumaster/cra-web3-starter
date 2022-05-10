import ChainIds from 'configs/chain';

import IToken from './IToken';

interface IChainInfo {
  name: string;
  shortName: string;
  chainId: ChainIds;
  icon: string;
  currency: Pick<IToken, 'name' | 'symbol' | 'decimals'>;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  type: string;
  contracts: {
    multicall: string;
  };
}

export default IChainInfo;
