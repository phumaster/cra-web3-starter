import { FC } from 'react';
import {
  VStack,
  Button,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import useSwitchNetworkModal from 'shared/hooks/useSwitchNetworkModal';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import constants from 'configs/constants';

const SwitchNetworkModal: FC = () => {
  const switchNetworkModal = useSwitchNetworkModal();
  const toast = useToast();
  const { chains, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      switchNetworkModal.close();
    },
    onError(error) {
      toast({
        title: 'An error occurred when switch network',
        description: error.message,
        isClosable: true,
        duration: constants.TOAST_DURATION,
        status: 'error',
      });
    },
  });
  const { chain } = useNetwork();
  return (
    <Modal isOpen={switchNetworkModal.visible} onClose={switchNetworkModal.close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Switch network</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {chains.map((item) => (
              <Button
                colorScheme="red"
                disabled={!switchNetwork || item.id === chain?.id}
                key={item.id}
                onClick={() => switchNetwork?.(item.id)}
                w="100%"
              >
                {item.name}
                {isLoading && pendingChainId === item.id && <Spinner />}
              </Button>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SwitchNetworkModal;
