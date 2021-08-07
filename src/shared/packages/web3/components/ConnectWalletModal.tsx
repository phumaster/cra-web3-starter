/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWeb3React } from '@web3-react/core';
import { FC, useEffect, useState } from 'react';

import { getConnectorsByName } from '../utils/helper';
import { useConnectModal, useEagerConnect, useInactiveListener, useRequestBscNetwork } from '../hooks';
import ProviderItem from './ProviderItem';
import Modal from '../../../components/Modal';
import styles from './ConnectWalletModal.module.scss';

const ConnectWalletModal: FC = () => {
  const connectModal = useConnectModal();
  const context = useWeb3React<unknown>();
  const { connector, activate, account } = context;

  const [activatingConnector, setActivatingConnector] = useState<unknown>();
  const [connectorName, setConnectorName] = useState<string>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !!activatingConnector);
  useRequestBscNetwork();
  const connectors = getConnectorsByName();
  const closeModal = () => connectModal.close();
  return (
    <Modal visible={connectModal.visible} onRequestClose={closeModal}>
      <div className={styles.title}>Connect to a wallet</div>
      <div className={styles.items}>
        {Object.keys(connectors).map((name) => {
          const currentConnector = connectors[name];
          const activating =
            currentConnector.provider === activatingConnector && currentConnector.name === connectorName;
          const connected = currentConnector.provider === connector;
          return (
            <ProviderItem
              key={currentConnector.name}
              icon={currentConnector.icon}
              name={currentConnector.name}
              connected={connected}
              activating={activating}
              account={account}
              onClick={async () => {
                setActivatingConnector(currentConnector.provider);
                setConnectorName(currentConnector.name);
                await activate((currentConnector as any).provider);
                closeModal();
              }}
            />
          );
        })}
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
