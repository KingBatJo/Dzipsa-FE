import popupIcon from '@/assets/icon/popup.svg';
import AppButton from '@/components/common/AppButton';
import AppDialog from '@/components/common/AppDialog';

type MyPageActionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmText: string;
  onConfirm: () => void;
  isConfirming?: boolean;
};

const MyPageActionDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  onConfirm,
  isConfirming = false,
}: MyPageActionDialogProps) => {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      contentClassName="w-[300px] rounded-[12px] p-4 pt-8 pb-4"
    >
      <div className="flex flex-col items-center gap-10">
        <div className="flex w-[225px] flex-col items-center gap-[15px] text-center">
          <img src={popupIcon} alt="" className="h-[49px] w-[49px]" />

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-base leading-[1.4] font-semibold text-zinc-900">
              {title}
            </h2>
            <p className="text-sm leading-[1.3] font-semibold text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <AppButton
            onClick={() => onOpenChange(false)}
            className="w-32 border border-zinc-800 bg-white text-zinc-800"
          >
            취소
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

export default MyPageActionDialog;
