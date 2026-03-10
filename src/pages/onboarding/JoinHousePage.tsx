import InviteCodeInputStep from '@/pages/onboarding/components/InviteCodeInputStep';
import { OTP_LENGTH } from '@/constants/onboarding';
import OnboardingFlowLayout from '@/pages/onboarding/components/OnboardingFlowLayout';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MOCK_VALID_INVITE_CODE = '123456';

type JoinHouseStep = 'invite' | 'confirm' | 'profile';

const JoinHousePage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<JoinHouseStep>('invite');
  const [inviteCode, setInviteCode] = useState('');
  const [hasError, setHasError] = useState(false);

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
      navigate('/');
    }
  };

  const buttonLabel =
    step === 'invite'
      ? '집 찾기'
      : step === 'confirm'
        ? '우리집 맞아요!'
        : '다음';

  const isNextDisabled =
    step === 'invite' ? inviteCode.length !== OTP_LENGTH : false;

  return (
    <OnboardingFlowLayout
      onBack={handleBack}
      onNext={handleNext}
      isNextDisabled={isNextDisabled}
      nextLabel={buttonLabel}
    >
      {step === 'invite' && (
        <InviteCodeInputStep
          inviteCode={inviteCode}
          hasError={hasError}
          onChangeInviteCode={handleChangeInviteCode}
        />
      )}

      {step === 'confirm' && <div>방 확인 화면</div>}

      {step === 'profile' && <div>프로필 설정 화면</div>}
    </OnboardingFlowLayout>
  );
};

export default JoinHousePage;
