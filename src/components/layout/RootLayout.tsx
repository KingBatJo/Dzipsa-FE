import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

const RootLayout = () => {
  return (
    <div>
      <div
        className={`mx-auto min-h-dvh w-full bg-zinc-100 ${MOBILE_MAX_WIDTH}`}
      >
        <Outlet />

        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'rounded-[38px] w-full bg-neutral-500/70 px-6 py-5 text-[13px] font-medium text-white text-center break-keep',
            },
          }}
        />
      </div>
    </div>
  );
};

export default RootLayout;
