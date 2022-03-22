import SwitchNetwork from '@/shared/components/SwitchNetwork';
import useConnectModal from '@/shared/hooks/useConnectModal';

const PageHeader: React.FC = () => {
  const { open } = useConnectModal();
  return (
    <header>
      <button onClick={open}>Open connect modal</button>
      <SwitchNetwork />
    </header>
  );
};

export default PageHeader;
