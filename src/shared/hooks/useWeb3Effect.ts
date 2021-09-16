import { useWeb3React } from '@web3-react/core';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import Web3 from 'web3';

import { getWeb3NoAccount } from '../../utils/helper';
import web3State from '../states/web3';

function useWeb3Effect(): void {
  const { library } = useWeb3React();
  const refEth = useRef(library);
  const setweb3 = useSetRecoilState(web3State);

  useEffect(() => {
    if (library !== refEth.current) {
      setweb3(library ? new Web3(library.provider) : getWeb3NoAccount());
      refEth.current = library;
    }
  }, [library, setweb3]);
}

export default useWeb3Effect;
