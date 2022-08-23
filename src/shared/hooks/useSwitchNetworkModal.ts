import { useCallback } from 'react';
import useAppState from './useAppState';

function useSwitchNetworkModal() {
  const { switchNetworkModalVisible, setAppState } = useAppState();

  const open = useCallback(() => setAppState((prev) => ({ ...prev, switchNetworkModalVisible: true })), [setAppState]);
  const close = useCallback(
    () => setAppState((prev) => ({ ...prev, switchNetworkModalVisible: false })),
    [setAppState],
  );

  return {
    visible: switchNetworkModalVisible,
    open,
    close,
  };
}

export default useSwitchNetworkModal;
