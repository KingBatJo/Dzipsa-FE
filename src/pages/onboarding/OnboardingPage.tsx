import AppButton from '@/components/common/AppButton';
import dzipsaCharacter from '@/assets/dzipsa.svg';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const initializeNicknames = useOnboardingStore(
    (state) => state.initializeNicknames
  );

  useEffect(() => {
    if (!user?.nickname) return;
    initializeNicknames(user.nickname);
  }, [user?.nickname, initializeNicknames]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center py-10">
      <div className="flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <div className="bg-secondary rounded-xl px-5 py-4">
            <h1 className="text-center text-lg leading-[1.3] font-semibold">
              <span>
                평화로운 공동생활의 시작,
                <br />
                디집사입니다
              </span>
            </h1>
          </div>

          <div className="border-t-secondary h-0 w-0 border-x-12 border-t-18 border-x-transparent" />
        </div>

        <img
          src={dzipsaCharacter}
          alt="디집사 캐릭터"
          className="h-full w-full"
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 pt-18">
        <p className="text-base font-semibold">어떤 방법으로 시작할까요?</p>

        <div className="flex w-full flex-col gap-3 px-4 text-sm leading-5 font-medium">
          <AppButton
            onClick={() => navigate('/onboarding/create', { replace: true })}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            새 집 만들기
          </AppButton>

          <AppButton
            onClick={() => navigate('/onboarding/join', { replace: true })}
            className="text-primary-foreground bg-neutral-500 hover:bg-neutral-600"
          >
            초대코드로 입장하기
          </AppButton>
        </div>
      </div>

      <p className="pt-14 text-center text-sm leading-[1.3] font-medium text-[#BCBCBC]">
        초대코드가 없을 시
        <br />새 집 만들기를 통해 방을 생성하세요
      </p>
    </div>
  );
};

export default OnboardingPage;
