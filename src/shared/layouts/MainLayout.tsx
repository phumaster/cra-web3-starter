import { FC, PropsWithChildren } from 'react';

import CommonInjected from 'shared/components/CommonInjected';

const MainLayout: FC<PropsWithChildren<{}>> = ({ children }) => (
  <>
    {children}
    <CommonInjected />
  </>
);

export default MainLayout;
