import { FC } from 'react';

import 'utils/i18n';

import ConnectWalletModal from 'shared/components/ConnectWalletModal';
import MainLayout from 'shared/layouts/main/MainLayout';
import Router from 'Router';

const App: FC = () => {
  return (
    <MainLayout>
      <Router />
      <ConnectWalletModal />
    </MainLayout>
  );
};

export default App;
