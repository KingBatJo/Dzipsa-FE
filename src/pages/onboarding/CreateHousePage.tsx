import { HEADER_HEIGHT_CLASS, MOBILE_MAX_WIDTH } from '@/constants/layout';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import HouseWelcomeDialog from '@/pages/onboarding/components/HouseWelcomeDialog';
import InviteCodeStep from '@/pages/onboarding/components/InviteCodeStep';
import MottoStep from '@/pages/onboarding/components/MottoStep';
import ProfileStep from '@/pages/onboarding/components/ProfileStep';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MOCK_INVITE_CODE = '123456';
const MOCK_INIT_NICKNAME = '닉네임';

type CreateHouseStep = 'motto' | 'profile' | 'invite';

const CreateHousePage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<CreateHouseStep>('motto');
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const [motto, setMotto] = useState('');
  const [nickname, setNickname] = useState(MOCK_INIT_NICKNAME);
  const [selectedProfileId, setSelectedProfileId] = useState(0);

  const getSafeNickname = (nickname: string) => {
    return nickname.trim() || MOCK_INIT_NICKNAME;
  };

  const handleBack = () => {
    if (step === 'profile') {
      setStep('motto');
      return;
    }

    if (step === 'invite') {
      setStep('profile');
      return;
    }

    // motto 단계일 때
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
      setStep('profile');
      return;
    }

    if (step === 'profile') {
      setNickname((prev) => getSafeNickname(prev));
      setStep('invite');
      return;
    }
  };

  const buttonLabel = step === 'invite' ? '집 입장하기' : '다음';

  const isNextDisabled =
    (step === 'motto' && !motto.trim()) ||
    (step === 'profile' && !nickname.trim());

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
        {step === 'motto' && (
          <MottoStep motto={motto} onChangeMotto={setMotto} />
        )}

        {step === 'profile' && (
          <ProfileStep
            nickname={nickname}
            selectedProfileId={selectedProfileId}
            onChangeNickname={setNickname}
            onChangeProfile={setSelectedProfileId}
          />
        )}

        {step === 'invite' && <InviteCodeStep inviteCode={MOCK_INVITE_CODE} />}
      </div>

      <footer className={`fixed bottom-0 ${MOBILE_MAX_WIDTH} w-full pb-9`}>
        <div className="flex flex-col gap-6 px-4">
          <Button
            onClick={handleNext}
            disabled={isNextDisabled}
            className="h-12 w-full rounded-[10px]"
          >
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

      <HouseWelcomeDialog
        open={isCompleteOpen}
        userName={getSafeNickname(nickname)}
        onConfirm={() => navigate('/', { replace: true })}
      />
    </div>
  );
};

export default CreateHousePage;
