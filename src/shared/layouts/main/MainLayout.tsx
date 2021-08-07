import PageHeader from './PageHeader';

const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <PageHeader />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
