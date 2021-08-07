/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useRecoilState } from 'recoil';

import { injected } from '../utils/connectors';
import { getWeb3NoAccount, requestBscNetwork } from '../utils/helper';
import IcBsc from '../../../../assets/icons/ic-bsc.svg';
import IcEth from '../../../../assets/icons/ic-eth.svg';
import IcMatic from '../../../../assets/icons/ic-matic.png';
import IcKcs from '../../../../assets/icons/ic-kcs.png';
import AppConfigs from '../../../../configs';
import modalState from '../states/modal';
import chainIdState from '../states/chainId';
import ChainIds from '../../../../configs/chainIds';

export function useConnectModal(): {
  open(): void;
  close(): void;
  visible: boolean;
} {
  const [state, setState] = useRecoilState(modalState);
  const open = useCallback(() => setState(true), []);
  const close = useCallback(() => setState(false), []);
  return {
    open,
    close,
    visible: state,
  };
}

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false): void {
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

export function useRequestBscNetwork(): void {
  const { connector, error, activate } = useWeb3React();
  useEffect(() => {
    if (!error || !connector) return;
    if (error instanceof UnsupportedChainIdError) {
      requestBscNetwork().then((requested) => {
        if (requested) {
          activate(connector);
        }
      });
    }
  }, [error, connector, activate]);
}

export function useWeb3(): Web3 {
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

export function useBalance(): string | undefined {
  const { account, library } = useWeb3React();
  const chainId = useChainId();
  const [balance, setBalance] = useState();
  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;
      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(undefined);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]);

  return balance ? (balance || '').toString() : balance;
}

export function useChainId(): number {
  const { chainId } = useWeb3React();
  const [chain] = useRecoilState(chainIdState);
  return chain || chainId || AppConfigs.networks.CHAIN_ID;
}

export function useChain(): {
  name: string;
  icon: string | null;
  family: string | null;
} {
  const chainId = useChainId();
  switch (chainId) {
    case ChainIds.ETH_MAINNET:
      return {
        name: 'ETH MAINNET',
        icon: IcEth,
        family: 'eth',
      };
    case ChainIds.BSC_TESTNET:
      return {
        name: 'BSC TESTNET',
        icon: IcBsc,
        family: 'bsc',
      };
    case ChainIds.BSC_MAINNET:
      return {
        name: 'BSC MAINNET',
        icon: IcBsc,
        family: 'bsc',
      };
    case ChainIds.MATIC_TESTNET:
      return {
        name: 'MUMBAI',
        icon: IcMatic,
        family: 'matic',
      };
    case ChainIds.MATIC_MAINNET:
      return {
        name: 'MATIC MANNET',
        icon: IcMatic,
        family: 'matic',
      };
    case ChainIds.KCC_TESTNET:
      return {
        name: 'KCC TESTNET',
        icon: IcKcs,
        family: 'kucoin',
      };
    case ChainIds.KCC_MAINNET:
      return {
        name: 'KCC MAINNET',
        icon: IcKcs,
        family: 'kucoin',
      };
    default:
      return {
        name: 'Not support',
        icon: null,
        family: null,
      };
  }
}
