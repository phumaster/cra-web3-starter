import { useWeb3React } from '@web3-react/core';
import { useEffect, useRef, useState } from 'react';
import Web3 from 'web3';

import { getWeb3NoAccount } from '../../utils/helper';

function useWeb3(): Web3 {
  const { library } = useWeb3React();
  const refEth = useRef(library);
  const [web3, setweb3] = useState(library ? new Web3(library.provider) : getWeb3NoAccount());

  useEffect(() => {
    if (library !== refEth.current) {
      setweb3(library ? new Web3(library.provider) : getWeb3NoAccount());
      refEth.current = library;
    }
  }, [library]);

  return web3;
}

export default useWeb3;
