import useWeb3Effect from '../../hooks/useWeb3Effect';
import PageHeader from './PageHeader';

const MainLayout: React.FC = ({ children }) => {
  useWeb3Effect();
  return (
    <>
      <PageHeader />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
