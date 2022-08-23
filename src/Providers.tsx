import { FC, PropsWithChildren } from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { WagmiConfig } from 'wagmi';
import { client } from 'utils/wagmi';

const Providers: FC<PropsWithChildren<{}>> = ({ children }) => (
  <WagmiConfig client={client}>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </WagmiConfig>
);

export default Providers;
