import { Drawer, DrawerContent } from '@/components/ui/drawer';

import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import { cn } from '@/lib/utils';

type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const BottomSheet = ({
  open,
  onOpenChange,
  children,
  className,
}: BottomSheetProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className={cn(
          'mx-auto w-full rounded-t-[16px]',
          className,
          MOBILE_MAX_WIDTH
        )}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
