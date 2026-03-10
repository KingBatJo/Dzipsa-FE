import { APP_URL } from '@/constants/onboarding';
import { Card } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import dzipsaCharacter from '@/assets/dzipsa.svg';
import { toast } from 'sonner';

type InviteCodeStepProps = {
  inviteCode: string;
};

const InviteCodeStep = ({ inviteCode }: InviteCodeStepProps) => {
  const inviteMessage = `[디집사] 룸메이트가 당신을 초대했어요!
입장 코드: ${inviteCode}
서비스 링크: ${APP_URL}`;

  const handleCopyInviteCode = async () => {
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
    <div className="pt-30">
      <section className="flex flex-1 flex-col items-center">
        <section className="text-center text-lg leading-6 font-semibold">
          <p>우리집이 생성되었어요</p>
          <p>우리집 비밀코드를 알려드릴게요!</p>
          <p>다른 멤버들에게 코드를 공유해보세요</p>
        </section>

        <section className="px-9 pt-9">
          <div className="relative pt-[130px]">
            <img
              src={dzipsaCharacter}
              alt="디집사 캐릭터"
              className="absolute top-8 left-1/2 h-[120px] -translate-x-1/2"
            />

            <Card
              onClick={handleCopyInviteCode}
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
          </div>

          <p className="pt-2 text-center text-xs font-semibold text-[#888888]">
            코드를 클릭하면 복사됩니다
          </p>
        </section>
      </section>
    </div>
  );
};

export default InviteCodeStep;
