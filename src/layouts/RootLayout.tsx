import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="bg-neutral-50">
      <div
        className={`bg-background mx-auto min-h-dvh w-full ${MOBILE_MAX_WIDTH}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
