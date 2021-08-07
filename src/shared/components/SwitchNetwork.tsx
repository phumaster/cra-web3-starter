import { FC, useState, useCallback } from 'react';
import { useChain } from '../packages/web3/hooks';

import Modal from './Modal';
import SwitchNetworkForm from './SwitchNetworkForm';

const SwitchNetwork: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const chain = useChain();
  const closeModal = useCallback(() => setVisible(false), []);
  const openModal = useCallback(() => setVisible(true), []);
  return (
    <>
      <Modal visible={visible} onRequestClose={closeModal}>
        <SwitchNetworkForm onClose={closeModal} />
      </Modal>
      <div className="network on-mobile" style={{ cursor: 'pointer' }} onClick={openModal}>
        {chain.icon ? <img src={chain.icon} width={18} alt="" /> : <img src="" alt="" />}
        <span className="ml-2 hide-on-mobile">{chain.name}</span>
      </div>
    </>
  );
};

export default SwitchNetwork;
