import { Outlet } from 'react-router-dom';

const MOBILE_MAX_WIDTH = 'max-w-[420px]'; // 임시

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
