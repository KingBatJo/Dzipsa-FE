import { Button } from '@/components/ui/button';
import HouseWelcomeDialog from '@/pages/onboarding/components/HouseWelcomeDialog';
import InviteCodeStep from '@/pages/onboarding/components/InviteCodeStep';
import MottoStep from '@/pages/onboarding/components/MottoStep';
import OnboardingFlowLayout from '@/pages/onboarding/components/OnboardingFlowLayout';
import ProfileStep from '@/pages/onboarding/components/ProfileStep';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { useState } from 'react';

const MOCK_INVITE_CODE = '123456';

const CreateHousePage = () => {
  const navigate = useNavigate();
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const {
    createFlow,
    setCreateStep,
    updateCreateFlow,
    setCreateNickname,
    resetOnboarding,
  } = useOnboardingStore();

  const { step, motto, nickname, selectedProfileId } = createFlow;

  const user = useAuthStore((state) => state.user);

  const getSafeNickname = (value: string) => {
    return value.trim() || user?.nickname || '';
  };

  const handleBack = () => {
    if (step === 'profile') {
      setCreateStep('motto');
      return;
    }

    if (step === 'invite') {
      setCreateStep('profile');
      return;
    }

    // motto 단계일 때
    navigate('/onboarding');
    return;
  };

  const handleNext = () => {
    if (step === 'motto') {
      setCreateStep('profile');
      return;
    }

    if (step === 'profile') {
      setCreateStep('invite');
      return;
    }

    console.log({
      motto,
      nickname,
      selectedProfileId,
    });

    // invite 단계일 때
    setIsCompleteOpen(true);
  };

  const handleSkip = () => {
    if (step === 'motto') {
      setCreateStep('profile');
      return;
    }

    if (step === 'profile') {
      updateCreateFlow({
        nickname: getSafeNickname(nickname),
      });
      setCreateStep('invite');
      return;
    }
  };

  const handleConfirm = () => {
    resetOnboarding();
    navigate('/home', { replace: true });
  };

  const buttonLabel = step === 'invite' ? '집 입장하기' : '다음';

  const isNextDisabled =
    (step === 'motto' && !motto.trim()) ||
    (step === 'profile' && !nickname.trim());

  const bottomSlot =
    step !== 'invite' ? (
      <div className="flex items-center justify-center">
        <Button
          variant="link"
          onClick={handleSkip}
          className="h-fit p-0 font-semibold text-[#888888]"
        >
          Skip
        </Button>
      </div>
    ) : (
      <div className="h-5 text-center text-xs font-semibold text-[#888888]">
        코드는 홈에서도 복사할 수 있어요!
      </div>
    );

  return (
    <>
      <OnboardingFlowLayout
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={isNextDisabled}
        nextLabel={buttonLabel}
        bottomSlot={bottomSlot}
      >
        {step === 'motto' && (
          <MottoStep
            motto={motto}
            onChangeMotto={(value) => updateCreateFlow({ motto: value })}
          />
        )}

        {step === 'profile' && (
          <ProfileStep
            nickname={nickname}
            selectedProfileId={selectedProfileId}
            onChangeNickname={setCreateNickname}
            onChangeProfile={(value) =>
              updateCreateFlow({ selectedProfileId: value })
            }
          />
        )}

        {step === 'invite' && <InviteCodeStep inviteCode={MOCK_INVITE_CODE} />}
      </OnboardingFlowLayout>

      <HouseWelcomeDialog
        open={isCompleteOpen}
        userName={getSafeNickname(nickname)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default CreateHousePage;
