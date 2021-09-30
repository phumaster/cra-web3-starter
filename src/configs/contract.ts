import multicallAbi from '../abi/multicall.json';
import ChainIds from './chain-ids';

const contract = {
  MAX_APPROVE: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  multicall: {
    ABI: multicallAbi,
    addresses: {
      [ChainIds.ETH_MAINNET]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
      [ChainIds.BSC_MAINNET]: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
      [ChainIds.BSC_TESTNET]: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
    },
  },
};

export default contract;
