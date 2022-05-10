import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import './utils/i18n';

import NotFoundPage from './modules/errors/NotFoundPage';
import IndexPage from './modules/home/IndexPage';
import ConnectWalletModal from './shared/components/ConnectWalletModal';
import MainLayout from './shared/layouts/main/MainLayout';

const App: FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
      <ConnectWalletModal />
    </MainLayout>
  );
};

export default App;
