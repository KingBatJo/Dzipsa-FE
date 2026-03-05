import { BOTTOM_NAV_HEIGHT, HEADER_HEIGHT } from '@/constants/layout';

import BottomNavigation from '@/components/common/BottomNavigation';
import Header from '@/components/common/Header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <Header />

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
