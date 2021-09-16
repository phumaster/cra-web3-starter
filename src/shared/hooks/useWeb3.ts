import { useRecoilState } from 'recoil';
import Web3 from 'web3';

import { getWeb3FromUri, web3NoAccount } from '../../utils/helper';
import web3State from '../states/web3';

function useWeb3(): Web3 {
  const [web3] = useRecoilState(web3State);
  return web3 || getWeb3FromUri() || web3NoAccount;
}

export default useWeb3;
