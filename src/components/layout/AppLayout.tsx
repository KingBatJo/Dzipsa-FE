import { BOTTOM_NAV_HEIGHT, HEADER_HEIGHT } from '@/constants/layout';
import { Outlet, useLocation } from 'react-router-dom';

import BottomNavigation from '@/components/layout/BottomNavigation';
import Header from '@/components/layout/Header';

const AppLayout = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/home';
  const isTodoPage = pathname.startsWith('/todos');

  const getHeaderTitle = () => {
    if (pathname.startsWith('/todos')) return '할 일 홈';
    if (pathname.startsWith('/rules')) return '우리집 규칙';
    return 'Dzipasa';
  };

  return (
    <div className="bg-zinc-100">
      <Header
        title={getHeaderTitle()}
        showActions={isHomePage}
        variant={isTodoPage ? 'white' : 'default'}
      />

      <main
        className={`relative min-h-dvh`}
        style={{
          paddingBottom: BOTTOM_NAV_HEIGHT + 16,
          paddingTop: HEADER_HEIGHT,
        }}
      >
        <Outlet />

        <BottomNavigation />
      </main>
    </div>
  );
};

export default AppLayout;
