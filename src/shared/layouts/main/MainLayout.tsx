import useWeb3Effect from '../../hooks/useWeb3Effect';
import PageHeader from './PageHeader';

const MainLayout: React.FC = ({ children }) => {
  useWeb3Effect();
  return (
    <div id="light-theme">
      <PageHeader />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
