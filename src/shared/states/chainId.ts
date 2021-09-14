import { atom } from 'recoil';

const chainIdState = atom<number | undefined>({
  key: 'web3ChainIdState',
  default: undefined,
});

export default chainIdState;
