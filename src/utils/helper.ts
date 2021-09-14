/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { Web3Provider } from '@ethersproject/providers';

import { ConnectorNames, POLLING_INTERVAL } from './constants';
import { injected, walletconnect } from './connectors';
import IcWalletConnect from '../assets/icons/walletconnect.svg';
import IcSafePad from '../assets/icons/safepad.svg';
import IcTrustWallet from '../assets/icons/trustwallet.svg';
import AppConfigs from '../configs';
import IcMetamask from '../assets/icons/metamask';
import ChainIds from '../configs/chainIds';

const { supportedNetworks } = AppConfigs.networks;

type TChainInfo = {
  chainId: number;
  name: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
};

export function getRpcUrl(): string {
  return supportedNetworks[`${ChainIds.BSC_MAINNET}`].rpcUrls[
    Math.floor(Math.random() * supportedNetworks[`${ChainIds.BSC_MAINNET}`].rpcUrls.length)
  ];
}

export function getTestnetRpcUrl(): string {
  return supportedNetworks[`${ChainIds.BSC_TESTNET}`].rpcUrls[
    Math.floor(Math.random() * supportedNetworks[`${ChainIds.BSC_TESTNET}`].rpcUrls.length)
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

export function getConnectorsByName(): { [key: string]: TConnector } {
  return {
    [ConnectorNames.Injected]: {
      name: 'Metamask',
      icon: IcMetamask,
      provider: injected,
    },
    [ConnectorNames.TrustWallet]: {
      name: 'TrustWallet',
      icon: IcTrustWallet,
      provider: injected,
    },
    [ConnectorNames.WalletConnect]: {
      name: 'WalletConnect',
      icon: IcWalletConnect,
      provider: walletconnect,
    },
    [ConnectorNames.SafePad]: {
      name: 'SafePad Wallet',
      icon: IcSafePad,
      provider: injected,
    },
  };
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
  const requested = await requestNetwork({
    chainId: ChainIds.BSC_MAINNET,
    name: 'Binance Smart Chain Mainnet',
    currency: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    rpcUrls: supportedNetworks[`${ChainIds.BSC_MAINNET}`].rpcUrls,
    blockExplorerUrls: supportedNetworks[`${ChainIds.BSC_MAINNET}`].blockExplorerUrls,
  });
  return requested;
}

const httpProvider = new Web3.providers.HttpProvider(
  process.env.PHASE === 'production' ? getRpcUrl() : getTestnetRpcUrl(),
  {
    timeout: 10000,
  },
);
export const web3NoAccount = new Web3(httpProvider);

export function getWeb3NoAccount(): Web3 {
  return web3NoAccount;
}

export function getContract(abi: AbiItem | AbiItem[], address: string, web3?: Web3): Contract {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi, address);
}

export function orThrow(message: string): Error {
  throw new Error(message);
}
