/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { injected } from '../../utils/connectors';
import chainIdState from '../states/chainId';

function useInactiveListener(suppress = false): void {
  const { active, error, activate } = useWeb3React();
  const [, setState] = useRecoilState(chainIdState);

  useEffect(() => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !error) {
      const handleConnect = () => {
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        setState(Number(chainId));
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}

export default useInactiveListener;
