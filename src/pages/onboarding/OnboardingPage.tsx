import AppButton from '@/components/common/AppButton';
import SpeechBubble from '@/components/common/SpeechBubble';
import onboarding from '@/assets/image/onboarding/onboarding.png';
import { useEffect } from 'react';
import { useMeQuery } from '@/api/auth/auth.query';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const { data: me } = useMeQuery();
  const userNickname = me?.nickname;
  const initializeNicknames = useOnboardingStore(
    (state) => state.initializeNicknames
  );

  useEffect(() => {
    if (!userNickname) return;
    initializeNicknames(userNickname);
  }, [userNickname, initializeNicknames]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-[52px] py-10">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex flex-col items-center">
          <SpeechBubble className="w-57.5 px-5 py-[18px]">
            <span className="text-lg leading-[1.3] font-semibold text-black">
              평화로운 공동생활의 시작,
              <br />
              디집사입니다
            </span>
          </SpeechBubble>
        </div>

        <img
          src={onboarding}
          alt="디집사 캐릭터"
          className="h-[145px] w-[217px]"
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-[55px]">
        <div className="flex flex-col items-center gap-1 px-5">
          <p className="text-xl font-semibold">어떤 방법으로 시작할까요?</p>
          <p className="text-center text-sm leading-[1.3] font-medium text-zinc-400">
            초대코드가 없을 시
            <br />새 집 만들기를 통해 방을 생성하세요.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 px-[15px] text-sm font-medium text-zinc-100">
          <AppButton
            onClick={() => navigate('/onboarding/create', { replace: true })}
            className="bg-zinc-800 hover:bg-zinc-900"
          >
            새 집 만들기
          </AppButton>

          <AppButton
            onClick={() => navigate('/onboarding/join', { replace: true })}
            className="bg-zinc-500 hover:bg-zinc-600"
          >
            초대코드로 입장하기
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
