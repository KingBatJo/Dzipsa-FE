import AppButton from '@/components/common/AppButton';
import AppDialog from '@/components/common/AppDialog';
import SpeechBubble from '@/components/common/SpeechBubble';
import notiWarningImage from '@/assets/image/noti/noti-warining.png';

type RuleNotifyConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
};

const RuleNotifyConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting = false,
}: RuleNotifyConfirmDialogProps) => {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="규칙 리마인드 확인"
      contentClassName="w-[300px] overflow-hidden p-0"
    >
      <div className="flex flex-col items-center gap-2 bg-white px-4 pt-8 pb-4">
        <div className="flex w-full flex-col items-center pb-10">
          <SpeechBubble className="w-[233px]">
            <p className="text-base leading-[1.3] font-semibold text-black">
              규칙이 지켜지지 않고 있나요?
              <br />
              디집사가 우리집에 전해드릴게요.
            </p>
            <p className="text-xs leading-[1.3] font-medium text-[#BCBCBC]">
              모두에게 규칙 리마인드 알림을 보내며,
              <br />
              익명으로 전달되니 부담 갖지 않으셔도 돼요
            </p>
          </SpeechBubble>
        </div>

        <div className="relative w-full pt-10">
          <img
            src={notiWarningImage}
            alt="리마인드 경고"
            className="absolute top-0 left-1/2 z-[2] h-[88px] w-[88px] -translate-x-1/2 -translate-y-[45%] object-contain"
          />

          <AppButton
            disabled={isSubmitting}
            onClick={onConfirm}
            className="h-12 rounded-xl bg-gradient-to-r from-[#171717] to-[#7d7d7d] text-zinc-100"
          >
            {isSubmitting ? '전달 중...' : '맡길게요'}
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
};

export default RuleNotifyConfirmDialog;
