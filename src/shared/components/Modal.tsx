import { FC, useCallback, MouseEvent, useEffect, PropsWithChildren } from 'react';

import styles from './Modal.module.scss';
import Portal from './Portal';
import IcClose from '../../assets/icons/close-pink.svg';

type Props = PropsWithChildren<{
  visible: boolean;
  closeable?: boolean;
  onRequestClose(): void;
}>;

const Modal: FC<Props> = ({ visible, closeable = true, onRequestClose, children }) => {
  const handleClickOverlay = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onRequestClose();
      }
    },
    [onRequestClose],
  );

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.body.style.position = 'relative';
    } else {
      document.body.removeAttribute('style');
    }

    return () => {
      document.body.removeAttribute('style');
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <Portal>
      <div className={styles.root} onClick={handleClickOverlay}>
        <div className={styles.content}>
          {closeable && <img src={IcClose} className={styles.close} alt="x" onClick={onRequestClose} />}
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
