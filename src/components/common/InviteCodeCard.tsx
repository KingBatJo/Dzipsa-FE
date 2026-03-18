import { APP_URL } from '@/constants/onboarding';
import { Card } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

type InviteCodeCardProps = {
  inviteCode: string;
};

const InviteCodeCard = ({ inviteCode }: InviteCodeCardProps) => {
  const inviteMessage = `[디집사] 룸메이트가 당신을 초대했어요!
입장 코드: ${inviteCode}
서비스 링크: ${APP_URL}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteMessage);

      toast(`초대 코드 ${inviteCode}이 클립보드에 복사되었습니다.`, {
        id: 'invite-copy-toast',
        duration: 2000,
      });
    } catch (err) {
      toast.error('초대 코드 복사 실패', {
        id: 'invite-copy-toast',
        duration: 2000,
      });
      console.error('초대 코드 복사 실패: ', err);
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleCopy}
      className="group bg-secondary flex h-[70px] cursor-pointer items-center border-none pr-4 shadow-none"
    >
      <div className="flex gap-[5px]">
        {inviteCode.split('').map((digit, index) => (
          <div
            key={index}
            className="flex h-[55px] w-10 items-center justify-center rounded-md px-1 py-2 text-lg font-semibold"
          >
            {digit}
          </div>
        ))}

        <div className="flex h-[55px] w-6 items-center p-0">
          <Copy className="h-6 w-6 shrink-0 text-[#E5E5E5] transition-all group-hover:text-[#888888]" />
        </div>
      </div>
    </Card>
  );
};

export default InviteCodeCard;
