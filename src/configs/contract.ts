import multicallAbi from '../abi/multicall.json';
import ChainIds from './chain-ids';

const contract = {
  multicall: {
    ABI: multicallAbi,
    addresses: {
      [ChainIds.ETH_MAINNET]: '0x.....',
      [ChainIds.BSC_MAINNET]: '0x.....',
      [ChainIds.BSC_TESTNET]: '0x.....',
    },
  },
};

export default contract;
