import { Button } from '@/components/ui/button';
import HouseConfirmStep from '@/pages/onboarding/components/HouseConfirmStep';
import InviteCodeInputStep from '@/pages/onboarding/components/InviteCodeInputStep';
import { OTP_LENGTH } from '@/constants/onboarding';
import OnboardingFlowLayout from '@/pages/onboarding/components/OnboardingFlowLayout';
import ProfileStep from '@/pages/onboarding/components/ProfileStep';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { useState } from 'react';

const MOCK_VALID_INVITE_CODE = '123456';

const JoinHousePage = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  const {
    joinFlow,
    setJoinStep,
    updateJoinFlow,
    setJoinNickname,
    resetOnboarding,
  } = useOnboardingStore();

  const { step, inviteCode, nickname, selectedProfileId } = joinFlow;

  const user = useAuthStore((state) => state.user);

  const getSafeNickname = (value: string) => {
    return value.trim() || user?.nickname || '';
  };

  const handleChangeInviteCode = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    updateJoinFlow({ inviteCode: numericValue });

    if (hasError) {
      setHasError(false);
    }
  };

  const handleBack = () => {
    if (step === 'invite') {
      navigate('/onboarding');
      return;
    }

    if (step === 'confirm') {
      setJoinStep('invite');
      return;
    }

    if (step === 'profile') {
      setJoinStep('confirm');
      return;
    }
  };

  const handleComplete = () => {
    const safeNickname = getSafeNickname(nickname);

    console.log({
      nickname: safeNickname,
      selectedProfileId,
    });

    resetOnboarding();
    navigate('/home', { replace: true });
  };

  const handleNext = () => {
    if (step === 'invite') {
      if (inviteCode !== MOCK_VALID_INVITE_CODE) {
        setHasError(true);
        toast('존재하지 않는 집입니다. 코드를 다시 입력해보세요', {
          id: 'invalid-invite-code',
          duration: 2000,
        });
        return;
      }

      setHasError(false);
      setJoinStep('confirm');
      return;
    }

    if (step === 'confirm') {
      setJoinStep('profile');
      return;
    }

    if (step === 'profile') {
      handleComplete();
    }
  };

  const handleSkip = () => {
    if (step !== 'profile') return;

    updateJoinFlow({
      nickname: getSafeNickname(nickname),
    });
    handleComplete();
  };

  const buttonLabel =
    step === 'invite'
      ? '집 찾기'
      : step === 'confirm'
        ? '우리집 맞아요!'
        : '다음';

  const isNextDisabled =
    (step === 'invite' ? inviteCode.length !== OTP_LENGTH : false) ||
    (step === 'profile' && !nickname.trim());

  const bottomSlot =
    step === 'profile' ? (
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
      <div className="h-5" />
    );

  return (
    <OnboardingFlowLayout
      onBack={handleBack}
      onNext={handleNext}
      isNextDisabled={isNextDisabled}
      nextLabel={buttonLabel}
      bottomSlot={bottomSlot}
    >
      {step === 'invite' && (
        <InviteCodeInputStep
          inviteCode={inviteCode}
          hasError={hasError}
          onChangeInviteCode={handleChangeInviteCode}
        />
      )}

      {step === 'confirm' && <HouseConfirmStep />}

      {step === 'profile' && (
        <ProfileStep
          nickname={nickname}
          selectedProfileId={selectedProfileId}
          onChangeNickname={setJoinNickname}
          onChangeProfile={(value) =>
            updateJoinFlow({ selectedProfileId: value })
          }
        />
      )}
    </OnboardingFlowLayout>
  );
};

export default JoinHousePage;
