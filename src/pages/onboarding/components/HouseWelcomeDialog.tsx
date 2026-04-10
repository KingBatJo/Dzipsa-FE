import AppButton from '@/components/common/AppButton';
import AppDialog from '@/components/common/AppDialog';
import SpeechBubble from '@/components/common/SpeechBubble';
import houseWelcome from '@/assets/image/onboarding/house-welcome.png';

type HouseWelcomeDialogProps = {
  open: boolean;
  onConfirm: () => void;
};

const HouseWelcomeDialog = ({ open, onConfirm }: HouseWelcomeDialogProps) => {
  return (
    <AppDialog
      open={open}
      title="환영 안내"
      contentClassName="max-w-[300px] text-center pt-8"
    >
      <div className="flex flex-col items-center gap-[77px]">
        <SpeechBubble>
          <h2 className="text-sm leading-[1.3] font-semibold">
            서먹한 소통도, 밀린 할 일도 싹<br />
            말끔해진 우리집으로 들어가 볼까요?
          </h2>
        </SpeechBubble>

        <div className="relative flex w-full flex-col items-center">
          <img
            src={houseWelcome}
            alt="디집사 캐릭터"
            className="pointer-events-none absolute -top-17 h-[85px] w-20.5"
          />

          <AppButton
            className="bg-[linear-gradient(90deg,_var(--primary,_#171717)_0%,_#7D7D7D_100%)] text-zinc-100"
            onClick={onConfirm}
          >
            우리집 입장하기
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
};

export default HouseWelcomeDialog;
