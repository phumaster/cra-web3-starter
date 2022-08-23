import { useToast } from '@chakra-ui/react';
import constants from 'configs/constants';
import { useCallback } from 'react';
import { useConnect, useDisconnect, ConnectorNotFoundError, UserRejectedRequestError } from 'wagmi';
import useConnectModal from './useConnectModal';

function useAuth() {
  const connectModal = useConnectModal();
  const { connectAsync, connectors } = useConnect({
    onSuccess(data) {
      connectModal.close();
    },
  });
  const { disconnect } = useDisconnect();
  const toast = useToast();

  const login = useCallback(
    async (connectorID: string) => {
      const findConnector = connectors.find((c) => c.id === connectorID);
      try {
        await connectAsync({ connector: findConnector });
      } catch (error) {
        if (error instanceof ConnectorNotFoundError) {
          toast({
            title: 'An error occurred when connect to wallet',
            description: 'No provider was found',
            isClosable: true,
            duration: constants.TOAST_DURATION,
            status: 'error',
          });
          return;
        }
        if (error instanceof UserRejectedRequestError) {
          toast({
            title: 'An error occurred when connect to wallet',
            description: 'User rejected request',
            isClosable: true,
            duration: constants.TOAST_DURATION,
            status: 'error',
          });
          return;
        }
        if (error instanceof Error) {
          toast({
            title: 'An error occurred when connect to wallet',
            description: error.message,
            isClosable: true,
            duration: constants.TOAST_DURATION,
            status: 'error',
          });
        }
      }
    },
    [connectors, connectAsync, toast],
  );

  const logout = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return { login, logout };
}

export default useAuth;
