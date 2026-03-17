import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

type AppDialogProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  contentClassName?: string;
  hideCloseButton?: boolean;
};

const AppDialog = ({
  open,
  onOpenChange,
  title,
  children,
  contentClassName,
  hideCloseButton = true,
}: AppDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'rounded-[16px] border-none bg-white p-4 shadow-lg',
          hideCloseButton && '[&>button]:hidden',
          contentClassName
        )}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AppDialog;
