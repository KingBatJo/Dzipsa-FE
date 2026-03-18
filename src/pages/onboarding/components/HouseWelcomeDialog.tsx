import AppDialog from '@/components/common/AppDialog';
import { Button } from '@/components/ui/button';
import dzipsaCharacter from '@/assets/dzipsa.svg';

type HouseWelcomeDialogProps = {
  open: boolean;
  userName: string;
  onConfirm: () => void;
};

const HouseWelcomeDialog = ({
  open,
  userName,
  onConfirm,
}: HouseWelcomeDialogProps) => {
  return (
    <AppDialog
      open={open}
      title="환영 안내"
      contentClassName="max-w-[300px] text-center"
    >
      <div className="mt-10 flex flex-col items-center gap-5">
        <h2 className="text-lg leading-6 font-semibold">
          아이쿠
          <br />
          오셨네요! {userName}님
          <br />
          외출하신 사이에 깨끗하게 치워뒀어요
          <br />
          집을 한번 둘러보실래요?
        </h2>

        <img src={dzipsaCharacter} alt="디집사 캐릭터" className="h-[120px]" />

        <Button className="h-12 w-full rounded-xl" onClick={onConfirm}>
          응 좋아!
        </Button>
      </div>
    </AppDialog>
  );
};

export default HouseWelcomeDialog;
