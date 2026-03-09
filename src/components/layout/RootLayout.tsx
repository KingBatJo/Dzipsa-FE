import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

const RootLayout = () => {
  return (
    <div className="bg-neutral-50">
      <div
        className={`bg-background mx-auto min-h-dvh w-full ${MOBILE_MAX_WIDTH}`}
      >
        <Outlet />

        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'w-full gap-2 text-white rounded-[38px] text-sm font-medium bg-neutral-500/70 border-none px-6 py-5 flex justify-center',
            },
          }}
        />
      </div>
    </div>
  );
};

export default RootLayout;
