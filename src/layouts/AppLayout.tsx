import Header from '@/components/common/Header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-h-dvh">
      <Header />

      <main className="relative min-h-dvh pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
