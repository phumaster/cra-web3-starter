import { FC } from 'react';

import ConnectWalletModal from './ConnectWalletModal';
import SwitchNetworkModal from './SwitchNetworkModal';

const CommonInjected: FC = () => (
  <>
    <ConnectWalletModal />
    <SwitchNetworkModal />
  </>
);

export default CommonInjected;
