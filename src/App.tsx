import { Box, VStack, Grid, Button } from '@chakra-ui/react';
import { useAccount, useNetwork } from 'wagmi';

import useConnectModal from 'shared/hooks/useConnectModal';
import MainLayout from 'shared/layouts/MainLayout';
import useSwitchNetworkModal from 'shared/hooks/useSwitchNetworkModal';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import useAuth from 'shared/hooks/useAuth';

export const App = () => {
  const { logout } = useAuth();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const connectModal = useConnectModal();
  const switchNetworkModal = useSwitchNetworkModal();

  return (
    <MainLayout>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={2}>
            <Button onClick={switchNetworkModal.open}>Switch Network {chain?.name}</Button>
            <Button onClick={connectModal.open} disabled={isConnected}>
              Connect Wallet
            </Button>
            <Button onClick={logout} disabled={!isConnected}>
              Disconnect {address}
            </Button>
          </VStack>
        </Grid>
      </Box>
    </MainLayout>
  );
};
