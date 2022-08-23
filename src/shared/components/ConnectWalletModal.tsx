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
} from '@chakra-ui/react';
import connectors from 'configs/connectors';
import useConnectModal from 'shared/hooks/useConnectModal';
import useAuth from 'shared/hooks/useAuth';

const ConnectWalletModal: FC = () => {
  const connectModal = useConnectModal();
  const { login } = useAuth();
  return (
    <Modal isOpen={connectModal.visible} onClose={connectModal.close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect to a wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {connectors.map((item) => (
              <Button
                colorScheme="red"
                key={item.connectorId}
                onClick={() => login(item.connectorId)}
                borderRadius={6}
                w="100%"
              >
                {item.title}
              </Button>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectWalletModal;
