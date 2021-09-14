/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import modalState from '../states/modal';

function useConnectModal(): {
  open(): void;
  close(): void;
  visible: boolean;
} {
  const [state, setState] = useRecoilState(modalState);
  const open = useCallback(() => setState(true), []);
  const close = useCallback(() => setState(false), []);
  return {
    open,
    close,
    visible: state,
  };
}

export default useConnectModal;
