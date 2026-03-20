import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

const RootLayout = () => {
  return (
    <div>
      <div className={`mx-auto min-h-dvh w-full ${MOBILE_MAX_WIDTH}`}>
        <Outlet />

        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'backdrop-blur-[10px] rounded-[38px] w-full bg-neutral-500/70 px-6 py-5 text- font-medium text-sm text-white text-center break-keep',
            },
          }}
        />
      </div>
    </div>
  );
};

export default RootLayout;
