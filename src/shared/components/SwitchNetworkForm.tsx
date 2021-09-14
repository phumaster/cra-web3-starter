/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback } from 'react';

import SwitchNetworkItem from './SwitchNetworkItem';
import styles from './SwitchNetworkForm.module.scss';
import { switchNetwork } from '../../utils/helper';
import AppConfigs from '../../configs';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';

type Props = {
  onClose?(): void;
};

const mainnet = Object.values(AppConfigs.networks.supportedNetworks).filter(({ type }) => type === 'mainnet');
const testnet = Object.values(AppConfigs.networks.supportedNetworks).filter(({ type }) => type === 'testnet');

const SwitchNetworkForm: FC<Props> = ({ onClose }) => {
  const history = useHistory();
  const { active } = useWeb3React();
  const handleClickItem = useCallback(
    (item) => () => {
      (async () => {
        try {
          onClose?.();
          const destination = `${history.location.pathname}?chain=${item.shortName}`;
          if (active) {
            const switched = await switchNetwork({
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
            if (switched) {
              history.replace(destination);
            } else {
              alert(`To switch to ${item.name} please do it manually from your wallet menu`);
            }
          } else {
            window.location.href = `#${destination}`; // use hash router
            window.location.reload();
          }
        } catch (e) {
          alert('Cannot switch network');
        }
      })();
    },
    [onClose, active],
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
