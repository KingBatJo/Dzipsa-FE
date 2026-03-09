import { Dialog, DialogContent } from '@/components/ui/dialog';

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
    <Dialog open={open}>
      <DialogContent className="max-w-[300px] rounded-xl p-4 text-center [&>button]:hidden">
        <div className="mt-10 flex flex-col items-center gap-5">
          <p className="text-lg leading-6 font-semibold">
            아이쿠
            <br />
            오셨네요! {userName}님
            <br />
            외출하신 사이에 깨끗하게 치워뒀어요
            <br />
            집을 한번 둘러보실래요?
          </p>

          <img
            src={dzipsaCharacter}
            alt="디집사 캐릭터"
            className="h-[120px]"
          />

          <Button className="h-12 w-full rounded-xl" onClick={onConfirm}>
            응 좋아!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HouseWelcomeDialog;
