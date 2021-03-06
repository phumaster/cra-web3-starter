/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { Interface } from '@ethersproject/abi';

import ChainIds from '../configs/chain';
import { getContract } from './web3';
import { orThrow } from './helper';
import chainInfo from './chain-info';

type Call = {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
};

type MulticallOptions = {
  web3?: Web3;
  blockNumber?: number;
  requireSuccess?: boolean;
};

function getMulticallContract(chainId: ChainIds, web3: any): any {
  return getContract(
    [
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'target',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'callData',
                type: 'bytes',
              },
            ],
            internalType: 'struct Multicall.Call[]',
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'aggregate',
        outputs: [
          {
            internalType: 'uint256',
            name: 'blockNumber',
            type: 'uint256',
          },
          {
            internalType: 'bytes[]',
            name: 'returnData',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    chainInfo.multicallAddresses[chainId],
    web3,
  );
}

async function multicall(abi: any[], calls: Call[], options: MulticallOptions = {}, chainId?: ChainIds): Promise<any> {
  try {
    const contract = getMulticallContract(chainId || ChainIds.BSC_TESTNET, options.web3);
    const itf = new Interface(abi);
    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]);
    const { returnData } = await contract.methods.aggregate(calldata).call(undefined, options.blockNumber);
    const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call));

    return res;
  } catch (error: any) {
    orThrow(error.toString());
  }
}

export default multicall;
