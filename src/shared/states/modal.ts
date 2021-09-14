import { atom } from 'recoil';

const modalState = atom<boolean>({
  key: 'web3ModalState',
  default: false,
});

export default modalState;
