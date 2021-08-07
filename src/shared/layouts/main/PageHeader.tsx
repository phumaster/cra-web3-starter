import SwitchNetwork from '../../components/SwitchNetwork';
import { useConnectModal } from '../../packages/web3/hooks';

const PageHeader: React.FC = () => {
  const { open } = useConnectModal();
  return (
    <header>
      <button onClick={open}>Open</button>
      <SwitchNetwork />
    </header>
  );
};

export default PageHeader;
