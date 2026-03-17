import InviteCodeCard from '@/components/common/InviteCodeCard';
import dzipsaCharacter from '@/assets/dzipsa.svg';

type InviteCodeStepProps = {
  inviteCode: string;
};

const InviteCodeStep = ({ inviteCode }: InviteCodeStepProps) => {
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

            <InviteCodeCard inviteCode={inviteCode} />
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
