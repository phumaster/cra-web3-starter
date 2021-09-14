import { FC, useState, useCallback } from 'react';
import useChain from '../hooks/useChain';

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
      <div onClick={openModal}>
        {chain.icon ? <img src={chain.icon} width={18} alt="" /> : <img src="" alt="" />}
        <span>{chain.name}</span>
      </div>
    </>
  );
};

export default SwitchNetwork;
