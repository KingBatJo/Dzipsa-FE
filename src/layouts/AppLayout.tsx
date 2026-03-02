import Header from '@/components/common/Header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <Header />

      <main className="pt-14">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
