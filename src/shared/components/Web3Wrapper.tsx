import { FC } from 'react';
import { Web3ReactProvider } from '@web3-react/core';

import { getLibrary } from '@/utils/web3';

const Web3Wrapper: FC = ({ children }) => <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>;

export default Web3Wrapper;
