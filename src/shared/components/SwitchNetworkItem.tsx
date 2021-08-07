import { FC } from 'react';
import styles from './SwitchNetworkItem.module.scss';

type Props = {
  icon: string;
  name: string;
  onClick(): void;
};

const SwitchNetworkItem: FC<Props> = ({ icon, name, onClick }) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <img src={icon} alt={name} className={styles.icon} />
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default SwitchNetworkItem;
