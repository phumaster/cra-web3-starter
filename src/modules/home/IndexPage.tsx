import { FC } from 'react';

import useAccountBalance from '../../shared/hooks/useAccountBalance';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const IndexPage: FC = () => {
  const balance = useAccountBalance();
  return <main style={pageStyles}>{balance}</main>;
};

export default IndexPage;
