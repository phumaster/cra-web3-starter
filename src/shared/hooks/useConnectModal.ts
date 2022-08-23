import { useCallback } from 'react';
import useAppState from './useAppState';

function useConnectModal() {
  const { connectModalVisible, setAppState } = useAppState();

  const open = useCallback(() => setAppState((prev) => ({ ...prev, connectModalVisible: true })), [setAppState]);
  const close = useCallback(() => setAppState((prev) => ({ ...prev, connectModalVisible: false })), [setAppState]);

  return {
    visible: connectModalVisible,
    open,
    close,
  };
}

export default useConnectModal;
