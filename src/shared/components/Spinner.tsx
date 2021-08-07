import { FC } from 'react';
import cls from 'classnames';

import styles from './Spinner.module.scss';

type Props = {
  spinning?: boolean;
  className?: string;
  overlayClassName?: string;
};

const Spinner: FC<Props> = ({ spinning = true, className, overlayClassName, children }) => (
  <div className={cls(styles.root, className)}>
    {spinning && (
      <>
        <div className={styles.loaderContainer}>
          <div className={styles.loader} />
        </div>
        <div className={cls(styles.overlay, overlayClassName)} />
      </>
    )}
    {children}
  </div>
);

export default Spinner;
