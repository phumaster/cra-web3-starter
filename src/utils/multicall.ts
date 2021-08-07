/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { Interface } from '@ethersproject/abi';

import ChainIds from '../configs/chainIds';
import { getContract } from './helper';
import AppConfigs from '../configs';

const MulticallAbi = require('../abi/MulticallAbi.json');

type Call = {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[];
};

type MulticallOptions = {
  web3?: Web3;
  blockNumber?: number;
  requireSuccess?: boolean;
};

function getMulticallContract(chainId: number, web3: any): any {
  switch (chainId) {
    case ChainIds.BSC_TESTNET:
      return getContract(MulticallAbi, AppConfigs.contract.multicall.BSC_TESTNET, web3);
    case ChainIds.MATIC_TESTNET:
      return getContract(MulticallAbi, AppConfigs.contract.multicall.MATIC_TESTNET, web3);
    case ChainIds.MATIC_MAINNET:
      return getContract(MulticallAbi, AppConfigs.contract.multicall.MATIC, web3);
    case ChainIds.KCC_TESTNET:
      return getContract(MulticallAbi, AppConfigs.contract.multicall.KCC_TESTNET, web3);
    case ChainIds.KCC_MAINNET:
      return getContract(MulticallAbi, AppConfigs.contract.multicall.KCC, web3);
    case ChainIds.ETH_MAINNET:
      return getContract(MulticallAbi, AppConfigs.contract.multicall.ETH, web3);
    default:
      return getContract(MulticallAbi, AppConfigs.contract.multicall.BSC, web3);
  }
}

async function multicall(abi: any[], calls: Call[], options: MulticallOptions = {}, chainId?: number): Promise<any> {
  try {
    const contract = getMulticallContract(chainId || ChainIds.BSC_TESTNET, options.web3);
    const itf = new Interface(abi);
    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]);
    const { returnData } = await contract.methods.aggregate(calldata).call(undefined, options.blockNumber);
    const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call));

    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export default multicall;
