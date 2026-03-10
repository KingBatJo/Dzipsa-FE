import { Button } from '@/components/ui/button';
import HouseConfirmStep from '@/pages/onboarding/components/HouseConfirmStep';
import InviteCodeInputStep from '@/pages/onboarding/components/InviteCodeInputStep';
import { OTP_LENGTH } from '@/constants/onboarding';
import OnboardingFlowLayout from '@/pages/onboarding/components/OnboardingFlowLayout';
import ProfileStep from '@/pages/onboarding/components/ProfileStep';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MOCK_VALID_INVITE_CODE = '123456';
const MOCK_INIT_NICKNAME = '카카오 닉네임';

type JoinHouseStep = 'invite' | 'confirm' | 'profile';

const JoinHousePage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<JoinHouseStep>('invite');
  const [inviteCode, setInviteCode] = useState('');
  const [hasError, setHasError] = useState(false);

  const [nickname, setNickname] = useState(MOCK_INIT_NICKNAME);
  const [selectedProfileId, setSelectedProfileId] = useState(0);

  const getSafeNickname = (nickname: string) => {
    return nickname.trim() || MOCK_INIT_NICKNAME;
  };

  const handleChangeInviteCode = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    setInviteCode(numericValue);

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
      setStep('invite');
      return;
    }

    if (step === 'profile') {
      setStep('confirm');
    }
  };

  const handleComplete = () => {
    const safeNickname = getSafeNickname(nickname);

    console.log({
      nickname: safeNickname,
      selectedProfileId,
    });

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
      setStep('confirm');
      return;
    }

    if (step === 'confirm') {
      setStep('profile');
      return;
    }

    if (step === 'profile') {
      handleComplete();
    }
  };

  const handleSkip = () => {
    if (step !== 'profile') return;
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
          onChangeNickname={setNickname}
          onChangeProfile={setSelectedProfileId}
        />
      )}
    </OnboardingFlowLayout>
  );
};

export default JoinHousePage;
