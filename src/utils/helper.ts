/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Web3 from 'web3';

import { web3NoAccount } from '../shared/packages/web3/utils/helper';

export function getContract(abi: any, address: string, web3?: Web3) {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi, address);
}

export function orThrow(message: string): any {
  throw new Error(message);
}
