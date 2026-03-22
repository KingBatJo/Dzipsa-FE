import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';

import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import { cn } from '@/lib/utils';

type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  dismissible?: boolean;
};

const BottomSheet = ({
  open,
  onOpenChange,
  children,
  className,
  title = '바텀 시트',
  description = '하단에서 열리는 시트 콘텐츠입니다.',
  dismissible = true,
}: BottomSheetProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} dismissible={dismissible}>
      <DrawerContent
        className={cn(
          'mx-auto max-h-[70dvh] w-full rounded-t-[16px]',
          !dismissible && '[&>div:first-child]:hidden',
          className,
          MOBILE_MAX_WIDTH
        )}
      >
        <DrawerTitle className="sr-only">{title}</DrawerTitle>
        <DrawerDescription className="sr-only">{description}</DrawerDescription>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
