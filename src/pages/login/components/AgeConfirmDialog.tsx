import AppDialog from '@/components/common/AppDialog';
import { Button } from '@/components/ui/button';

type AgeConfirmDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const AgeConfirmDialog = ({
  open,
  onCancel,
  onConfirm,
}: AgeConfirmDialogProps) => {
  return (
    <AppDialog
      open={open}
      title="만 14세 미만 서비스 제한"
      contentClassName="w-[300px]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold">14세 미만 서비스 제한</h2>

          <p className="text-xs font-semibold break-keep text-[#BCBCBC]">
            만 14세 미만 아동의 가입을 제한하며, 허위 정보로 가입 시 발생하는
            모든 책임은 사용자 본인(또는 법정대리인)에게 있습니다. 허위 가입
            확인 시 사전 통보 없이 계정이 삭제될 수 있습니다.
          </p>
        </div>

        <div className="flex justify-between text-sm font-medium">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="border-primary h-12 w-32 rounded-[10px] border"
          >
            취소
          </Button>

          <Button
            type="button"
            variant="default"
            onClick={onConfirm}
            className="h-12 w-32 rounded-[10px] text-white"
          >
            확인
          </Button>
        </div>
      </div>
    </AppDialog>
  );
};

export default AgeConfirmDialog;
