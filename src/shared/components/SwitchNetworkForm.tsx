/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback } from 'react';

import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';

import { switchNetwork } from '@/utils/web3';
import chainInfo from '@/utils/chain-info';

import SwitchNetworkItem from './SwitchNetworkItem';

import styles from './SwitchNetworkForm.module.scss';

type Props = {
  onClose?(): void;
};

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
        {chainInfo.mainnet.map((chain) => (
          <SwitchNetworkItem key={chain.chainId} name={chain.name} icon={chain.icon} onClick={handleClickItem(chain)} />
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.chains}>
        {chainInfo.testnet.map((chain) => (
          <SwitchNetworkItem key={chain.chainId} name={chain.name} icon={chain.icon} onClick={handleClickItem(chain)} />
        ))}
      </div>
    </>
  );
};

export default SwitchNetworkForm;
