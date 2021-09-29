import ChainIds from '@/configs/chain-ids';
import IToken from './IToken';

interface INetworkInfo {
  name: string;
  shortName: string;
  chainId: ChainIds;
  icon: string;
  currency: Pick<IToken, 'name' | 'symbol' | 'decimals'>;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  type: string;
}

export default INetworkInfo;
