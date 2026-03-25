import AppButton from '@/components/common/AppButton';
import AppDialog from '@/components/common/AppDialog';

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isConfirming?: boolean;
};

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  isConfirming = false,
}: ConfirmDialogProps) => {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      contentClassName="w-[300px] p-4 pt-8 pb-4"
    >
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-center text-base font-semibold text-black">
          {message}
        </h2>

        <div className="flex w-full items-center justify-between">
          <AppButton
            onClick={() => {
              onCancel?.();
              onOpenChange(false);
            }}
            className="w-32 border border-zinc-800 text-zinc-800"
          >
            {cancelText}
          </AppButton>

          <AppButton
            disabled={isConfirming}
            onClick={onConfirm}
            className="w-32 bg-zinc-800 text-zinc-100"
          >
            {confirmText}
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
};

export default ConfirmDialog;
