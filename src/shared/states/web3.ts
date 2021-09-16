import { atom } from 'recoil';
import Web3 from 'web3';

const web3State = atom<Web3 | undefined>({
  key: 'web3State',
  default: undefined,
  dangerouslyAllowMutability: true, // web3 need to modify object. Please disable default atom
});

export default web3State;
