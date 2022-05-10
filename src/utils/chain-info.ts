import AppConfigs from 'configs';
import IChainInfo from 'types/IChainInfo';

const multicallAddresses = AppConfigs.supportedChains.reduce((acc, current) => {
  acc[current.chainId] = current.contracts.multicall;
  return acc;
}, {} as { [key: number]: string });

const chains = AppConfigs.supportedChains.reduce((acc, current) => {
  acc[current.chainId] = current;
  return acc;
}, {} as { [key: number]: IChainInfo });

const testnet = AppConfigs.supportedChains.filter((chain) => chain.type === 'testnet');
const mainnet = AppConfigs.supportedChains.filter((chain) => chain.type === 'mainnet');

const chainInfo = {
  multicallAddresses,
  testnet,
  mainnet,
  chains,
};

export default chainInfo;
