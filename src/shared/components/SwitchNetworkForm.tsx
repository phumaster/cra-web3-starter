import { FC, useCallback } from 'react';

import ChainIds from '../../configs/chainIds';
import SwitchNetworkItem from './SwitchNetworkItem';
import styles from './SwitchNetworkForm.module.scss';
import { requestNetwork } from '../packages/web3/utils/helper';
import AppConfigs from '../../configs';

type Props = {
  onClose?(): void;
};

const mainnet = Object.values(AppConfigs.networks.supportedNetworks).filter(({ type }) => type === 'mainnet');
const testnet = Object.values(AppConfigs.networks.supportedNetworks).filter(({ type }) => type === 'testnet');

const SwitchNetworkForm: FC<Props> = ({ onClose }) => {
  const handleClickItem = useCallback(
    (item) => () => {
      (async () => {
        try {
          onClose?.();
          if (item.chainId === ChainIds.ETH_MAINNET) {
            alert('To switch to Ethereum please do it manually from your wallet menu');
            return;
          }
          await requestNetwork({
            chainId: item.chainId,
            name: item.name,
            currency: {
              name: item.currency.name,
              symbol: item.currency.symbol,
              decimals: item.currency.decimals,
            },
            rpcUrls: item.rpcUrls,
            blockExplorerUrls: item.blockExplorerUrls,
          });
        } catch (e) {
          alert('Cannot switch network');
        }
      })();
    },
    [onClose],
  );
  return (
    <>
      <div className={styles.title}>Switch network</div>
      <div className={styles.chains}>
        {mainnet.map((chain) => (
          <SwitchNetworkItem key={chain.chainId} name={chain.name} icon={chain.icon} onClick={handleClickItem(chain)} />
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.chains}>
        {testnet.map((chain) => (
          <SwitchNetworkItem key={chain.chainId} name={chain.name} icon={chain.icon} onClick={handleClickItem(chain)} />
        ))}
      </div>
    </>
  );
};

export default SwitchNetworkForm;
