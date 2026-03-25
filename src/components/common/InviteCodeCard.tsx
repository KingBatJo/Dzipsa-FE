import { APP_URL } from '@/constants/onboarding';
import { Card } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type InviteCodeCardProps = {
  inviteCode: string;
  className?: string;
  isDimmed?: boolean;
  disableCopy?: boolean;
};

const InviteCodeCard = ({
  inviteCode,
  className,
  isDimmed = false,
  disableCopy = false,
}: InviteCodeCardProps) => {
  const inviteMessage = `[우리집 룸메이트가 당신을 초대했어요!]
코드는 24시간 동안 유효합니다.
입장 코드: ${inviteCode}
서비스 링크: ${APP_URL}`;

  const handleCopy = async () => {
    if (disableCopy || !inviteCode) return;

    try {
      await navigator.clipboard.writeText(inviteMessage);

      toast(`초대 코드 ${inviteCode}가 클립보드에 복사되었어요.`, {
        id: 'invite-copy-toast',
        duration: 2000,
      });
    } catch (err) {
      toast.error('초대 코드 복사에 실패했어요.', {
        id: 'invite-copy-toast',
        duration: 2000,
      });
      console.error('초대 코드 복사 실패: ', err);
    }
  };

  return (
    <Card
      role={disableCopy ? undefined : 'button'}
      tabIndex={disableCopy ? -1 : 0}
      onClick={handleCopy}
      className={cn(
        'flex h-[70px] items-center gap-[5px] rounded-[12px] border-none bg-zinc-100 pr-3 shadow-none',
        !disableCopy && 'group cursor-pointer',
        className
      )}
    >
      {inviteCode.split('').map((digit, index) => (
        <div
          key={`${digit}-${index}`}
          className="flex h-[55px] w-[39px] items-center justify-center rounded-[8px] px-1 py-[7px]"
        >
          <span
            className={cn(
              'text-center text-[18px] leading-normal font-semibold',
              isDimmed ? 'text-zinc-300' : 'text-zinc-900'
            )}
          >
            {digit}
          </span>
        </div>
      ))}

      <div className="flex h-[55px] w-6 items-center justify-center p-0">
        <Copy
          className={cn(
            'h-6 w-6 shrink-0',
            isDimmed || disableCopy
              ? 'text-zinc-300'
              : 'text-zinc-300 transition-colors group-hover:text-zinc-500'
          )}
        />
      </div>
    </Card>
  );
};

export default InviteCodeCard;
