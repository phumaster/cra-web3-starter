/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

import AppConfigs from '../../../../configs';
import Spinner from '../../../components/Spinner';
import styles from './ProviderItem.module.scss';

type Props = {
  name: string;
  icon: string;
  activating: boolean;
  connected: boolean;
  account?: string | null;
  onClick(): void;
};

const ProviderItem: FC<Props> = ({ icon, name, activating, onClick }) => {
  const isMetaMaskEnabled =
    typeof (window as any).ethereum !== 'undefined' || typeof (window as any).web3 !== 'undefined';
  if (name.toLowerCase() === 'metamask' && !isMetaMaskEnabled) {
    return (
      <a href={AppConfigs.links.METAMASK} target="_blank" rel="nofollow noreferrer" className={styles.item}>
        <img src={icon} alt="" className={styles.icon} />
        <div className={styles.title}>Install Metamask</div>
      </a>
    );
  }
  return (
    <Spinner spinning={activating} overlayClassName={styles.radius}>
      <div className={styles.item} onClick={onClick}>
        <img src={icon} alt="" className={styles.icon} />
        <div className={styles.title}>{name}</div>
      </div>
    </Spinner>
  );
};

export default ProviderItem;
