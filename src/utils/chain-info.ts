import AppConfigs from 'configs';

const multicallAddresses = AppConfigs.supportedChains.reduce((acc, current) => {
  acc[current.chainId] = current.contracts.multicall;
  return acc;
}, {} as { [key: number]: string });

const testnet = AppConfigs.supportedChains.filter((chain) => chain.type === 'testnet');
const mainnet = AppConfigs.supportedChains.filter((chain) => chain.type === 'mainnet');

const chainInfo = {
  multicallAddresses,
  testnet,
  mainnet,
};

export default chainInfo;
