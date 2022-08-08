import { FC, PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

import Web3Wrapper from 'shared/components/Web3Wrapper';

const Providers: FC<PropsWithChildren<{}>> = ({ children }) => (
  <RecoilRoot>
    <BrowserRouter>
      <Web3Wrapper>{children}</Web3Wrapper>
    </BrowserRouter>
  </RecoilRoot>
);

export default Providers;
