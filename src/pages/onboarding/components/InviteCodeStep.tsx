import InviteCodeCard from '@/components/common/InviteCodeCard';
import codeGenerate from '@/assets/image/onboarding/code-gernerate.png';

type InviteCodeStepProps = {
  inviteCode: string;
};

const InviteCodeStep = ({ inviteCode }: InviteCodeStepProps) => {
  return (
    <div>
      <section className="flex flex-col gap-5.5 p-7.5">
        <section className="flex flex-col gap-[5px] text-xl font-semibold">
          <p>우리집이 생성되었어요 !</p>
          <p>입장 코드를 공유하고 초대해보세요.</p>
          <p className="text-sm text-zinc-400">
            발급받은 코드는 24시간동안 유효합니다.
          </p>
        </section>

        <section className="px-[15px] pt-[65px]">
          <div className="relative flex flex-col items-center">
            <img
              src={codeGenerate}
              alt="디집사 캐릭터"
              className="pointer-events-none h-31.5 w-30"
            />

            <InviteCodeCard
              inviteCode={inviteCode}
              className="absolute -bottom-14"
            />
          </div>
          <p className="pt-16.5 text-center text-sm font-medium text-zinc-400">
            코드를 터치해서 복사해 보세요
          </p>
        </section>
      </section>
    </div>
  );
};

export default InviteCodeStep;
