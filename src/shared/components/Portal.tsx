import { FC, PropsWithChildren, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Portal: FC<PropsWithChildren<{}>> = ({ children }) => {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    modalRoot?.appendChild(el);
    return () => {
      modalRoot?.removeChild(el);
    };
  }, [el]);

  return createPortal(children, el);
};

export default Portal;
