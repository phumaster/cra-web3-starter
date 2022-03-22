import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import useAccountBalance from '@/shared/hooks/useAccountBalance';

const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const IndexPage: FC = () => {
  const { value } = useAccountBalance();
  const { t, i18n } = useTranslation();
  return (
    <main style={pageStyles}>
      <h1>{t('Welcome to React')}</h1>
      <div>{value?.toString()}</div>
      <button onClick={() => i18n.changeLanguage('de')}>DE</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
    </main>
  );
};

export default IndexPage;
