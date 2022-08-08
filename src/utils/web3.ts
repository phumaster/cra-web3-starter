/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { Web3Provider } from '@ethersproject/providers';
import query from 'querystring';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import IChainInfo from 'types/IChainInfo';

import { ConnectorNames, POLLING_INTERVAL } from './constants';
import { coinbaseWallet, injected, walletconnect } from './connectors';
import IcWalletConnect from '../assets/icons/walletconnect.svg';
import IcSafePad from '../assets/icons/safepad.svg';
import IcTrustWallet from '../assets/icons/trustwallet.svg';
import IcCoinbase from '../assets/icons/coinbase.png';
import IcMetamask from '../assets/icons/metamask';
import ChainIds from '../configs/chain';
import AppConfigs from 'configs';

type TChainInfo = Pick<IChainInfo, 'chainId' | 'name' | 'currency' | 'rpcUrls' | 'blockExplorerUrls'>;

export function getRpcUrl(chain?: ChainIds): string {
  return AppConfigs.chains[chain || ChainIds.BSC_MAINNET].rpcUrls[
    Math.floor(Math.random() * AppConfigs.chains[chain || ChainIds.BSC_MAINNET].rpcUrls.length)
  ];
}

export function getTestnetRpcUrl(chain?: ChainIds): string {
  return AppConfigs.chains[chain || ChainIds.BSC_TESTNET].rpcUrls[
    Math.floor(Math.random() * AppConfigs.chains[chain || ChainIds.BSC_TESTNET].rpcUrls.length)
  ];
}

// @ts-ignore
export function getLibrary(provider: unknown): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

type TConnector = {
  name: string;
  provider: unknown;
  icon: string;
};

export const connectorByName: { [key: string]: TConnector } = {
  [ConnectorNames.Injected]: {
    name: 'Metamask',
    icon: IcMetamask,
    provider: injected,
  },
  [ConnectorNames.WalletConnect]: {
    name: 'WalletConnect',
    icon: IcWalletConnect,
    provider: walletconnect(),
  },
  [ConnectorNames.Coinbase]: {
    name: 'Coinbase',
    icon: IcCoinbase,
    provider: coinbaseWallet(),
  },
  [ConnectorNames.TrustWallet]: {
    name: 'TrustWallet',
    icon: IcTrustWallet,
    provider: injected,
  },
  [ConnectorNames.SafePad]: {
    name: 'SafePad',
    icon: IcSafePad,
    provider: injected,
  },
};

export function getProviderByName(name: string, chainId?: ChainIds): null | WalletLinkConnector {
  if (name === 'WalletConnect') return walletconnect(chainId);
  if (name === 'Coinbase') return coinbaseWallet(chainId);
  return null;
}

export async function requestNetwork(options: TChainInfo): Promise<boolean> {
  const provider = (window as WindowChain).ethereum;
  if (provider) {
    try {
      // @ts-ignore
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${options.chainId.toString(16)}`,
            chainName: options.name,
            nativeCurrency: {
              name: options.currency.name,
              symbol: options.currency.symbol,
              decimals: options.currency.decimals,
            },
            rpcUrls: options.rpcUrls,
            blockExplorerUrls: options.blockExplorerUrls,
          },
        ],
      });
      return true;
    } catch (error) {
      return false;
    }
  } else {
    console.error('Cannot setup the network on metamask because window.ethereum is undefined');
    return false;
  }
}

export async function switchNetwork(options: TChainInfo): Promise<boolean> {
  try {
    const provider = (window as WindowChain).ethereum;
    // @ts-ignore
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${options.chainId.toString(16)}` }],
    });
    return true;
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await requestNetwork(options);
        return true;
      } catch (addError) {
        return false;
      }
    }
    return false;
  }
}

export async function requestBscNetwork(): Promise<boolean> {
  const bsc = AppConfigs.chains[ChainIds.BSC_MAINNET];
  const requested = await requestNetwork({
    chainId: ChainIds.BSC_MAINNET,
    name: bsc.name,
    currency: {
      name: bsc.currency.name,
      symbol: bsc.currency.symbol,
      decimals: bsc.currency.decimals,
    },
    rpcUrls: bsc.rpcUrls,
    blockExplorerUrls: bsc.blockExplorerUrls,
  });
  return requested;
}

const httpProvider = new Web3.providers.HttpProvider(
  process.env.NODE_ENV === 'production' ? getRpcUrl() : getTestnetRpcUrl(),
  {
    timeout: 10000,
  },
);

export const web3NoAccount = new Web3(httpProvider);

export function chainToId(chain: string): ChainIds {
  return (
    {
      BSC: ChainIds.BSC_MAINNET,
      ETH: ChainIds.ETH_MAINNET,
      'BSC-Test': ChainIds.BSC_TESTNET,
    }[chain] || ChainIds.BSC_MAINNET
  );
}

export function idToChainName(chainId: number): string | undefined {
  return {
    [ChainIds.BSC_MAINNET]: 'BSC',
    [ChainIds.ETH_MAINNET]: 'ETH',
    [ChainIds.BSC_TESTNET]: 'BSC-Test',
  }[chainId];
}

function getRpcUrlByChain(chain?: ChainIds) {
  const rpc = getRpcUrl(chain);
  return rpc || (process.env.NODE_ENV === 'production' ? getRpcUrl() : getTestnetRpcUrl());
}

export function getWeb3FromUri(): Web3 | undefined {
  const [, segment] = window.location.href.split('?');
  if (segment) {
    const qs = query.parse(segment);
    if (qs.chain) {
      const id = chainToId(qs.chain as string);
      const rpc = getRpcUrlByChain(id);
      const provider = new Web3.providers.HttpProvider(rpc, {
        timeout: 10000,
      });
      return new Web3(provider);
    }
  }
  return undefined;
}

export function getChainIdFromUri(): ChainIds | undefined {
  const [, segment] = window.location.href.split('?');
  if (segment) {
    const qs = query.parse(segment);
    if (qs.chain) {
      const id = chainToId(qs.chain as string);
      return id;
    }
  }
  return undefined;
}

export function getChainByUri(): string | string[] | undefined {
  const [, segment] = window.location.href.split('?');
  if (segment) {
    const qs = query.parse(segment);
    return qs.chain;
  }
  return undefined;
}

export function getWeb3NoAccount(): Web3 {
  return getWeb3FromUri() || web3NoAccount;
}

export function getContract(abi: AbiItem | AbiItem[], address: string, web3?: Web3): Contract {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi, address);
}
