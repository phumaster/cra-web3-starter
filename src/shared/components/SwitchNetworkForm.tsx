import { FC, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useLocation, useNavigate } from 'react-router-dom';

import { switchNetwork } from 'utils/web3';
import chainInfo from 'utils/chain-info';
import IChainInfo from 'types/IChainInfo';

import SwitchNetworkItem from './SwitchNetworkItem';

import styles from './SwitchNetworkForm.module.scss';

type Props = {
  onClose?(): void;
};

const SwitchNetworkForm: FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { active } = useWeb3React();
  const handleClickItem = useCallback(
    (item: IChainInfo) => () => {
      (async () => {
        try {
          onClose?.();
          const destination = `${location.pathname}?chain=${item.shortName}`;
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
              navigate(destination, { replace: true });
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
    [onClose, location.pathname, active, navigate],
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
