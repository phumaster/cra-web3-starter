import { Helmet } from 'react-helmet';
import { PropsWithChildren, useMemo } from 'react';

import useWeb3Effect from 'shared/hooks/useWeb3Effect';
import useTheme, { useThemeEffect } from 'shared/hooks/useTheme';
import AppConfigs from 'configs';

import PageHeader from './PageHeader';

const { dark, light } = AppConfigs.theme;

const MainLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { theme, setTheme } = useTheme();

  const colors = useMemo(() => (theme === 'dark' ? dark.colors : light.colors), [theme]);

  useWeb3Effect();
  useThemeEffect();
  return (
    <>
      <Helmet>
        <style>
          {`
        ::selection {
          background: ${theme === 'dark' ? 'red' : 'green'};
          color: white;
        }

        :root {
          --background: ${colors.background};
          --text-color: ${colors.textColor};
        }
        `}
        </style>
      </Helmet>
      <div id={`${theme}-mode`}>
        <PageHeader />
        <button onClick={() => setTheme('dark')}>dark</button>
        <button onClick={() => setTheme('light')}>light</button>
        <div>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
