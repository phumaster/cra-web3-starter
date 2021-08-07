import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from './modules/errors/NotFoundPage';
import IndexPage from './modules/home/IndexPage';
import MainLayout from './shared/layouts/main/MainLayout';
import ConnectWalletModal from './shared/packages/web3/components/ConnectWalletModal';

const App: FC = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <ConnectWalletModal />
    </MainLayout>
  );
};

export default App;
