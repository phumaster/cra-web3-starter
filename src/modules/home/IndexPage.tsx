import { FC } from 'react';

import useAccountBalance from '@/shared/hooks/useAccountBalance';

const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const IndexPage: FC = () => {
  const { value } = useAccountBalance();
  return <main style={pageStyles}>{value?.toString()}</main>;
};

export default IndexPage;
