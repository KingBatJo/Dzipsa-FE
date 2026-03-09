import { HEADER_HEIGHT_CLASS, MOBILE_MAX_WIDTH } from '@/constants/layout';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import InviteCodeStep from '@/pages/onboarding/components/InviteCodeStep';
import MottoStep from '@/pages/onboarding/components/MottoStep';
import ProfileStep from '@/pages/onboarding/components/ProfileStep';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type CreateHouseStep = 'motto' | 'profile' | 'invite';

const CreateHousePage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<CreateHouseStep>('motto');

  const handleBack = () => {
    if (step === 'profile') {
      setStep('motto');
      return;
    }

    if (step === 'invite') {
      setStep('profile');
      return;
    }

    navigate('/onboarding');
  };

  const handleNext = () => {
    if (step === 'motto') {
      setStep('profile');
      return;
    }

    if (step === 'profile') {
      setStep('invite');
      return;
    }

    navigate('/', { replace: true });
  };

  const handleSkip = () => {
    if (step === 'motto') {
      setStep('profile');
      return;
    }

    if (step === 'profile') {
      setStep('invite');
      return;
    }
  };

  const buttonLabel = step === 'invite' ? '집 입장하기' : '다음';

  return (
    <div>
      <header className={`${HEADER_HEIGHT_CLASS} flex items-center p-4`}>
        <Button
          type="button"
          onClick={handleBack}
          aria-label="뒤로가기"
          variant="ghost"
          className="h-fit p-1.5"
        >
          <ChevronLeft />
        </Button>
      </header>

      <div className="px-4">
        {step === 'motto' && <MottoStep />}

        {step === 'profile' && <ProfileStep />}

        {step === 'invite' && <InviteCodeStep />}
      </div>

      <footer className={`fixed bottom-0 ${MOBILE_MAX_WIDTH} w-full pb-9`}>
        <div className="flex flex-col gap-6 px-4">
          <Button onClick={handleNext} className="h-12 w-full rounded-[10px]">
            {buttonLabel}
          </Button>

          {step !== 'invite' ? (
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
          )}
        </div>
      </footer>
    </div>
  );
};

export default CreateHousePage;
