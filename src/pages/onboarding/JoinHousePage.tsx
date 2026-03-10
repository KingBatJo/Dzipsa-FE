import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import OnboardingFlowLayout from '@/pages/onboarding/components/OnboardingFlowLayout';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OTP_LENGTH = 6;
const MOCK_VALID_INVITE_CODE = '123456';

const JoinHousePage = () => {
  const navigate = useNavigate();

  const [inviteCode, setInviteCode] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChangeInviteCode = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    setInviteCode(numericValue);

    if (hasError) {
      setHasError(false);
    }
  };

  const handleNext = () => {
    if (inviteCode !== MOCK_VALID_INVITE_CODE) {
      setHasError(true);
      toast('존재하지 않는 집입니다. 코드를 다시 입력해보세요', {
        id: 'invalid-invite-code',
        duration: 2000,
      });
      return;
    }

    setHasError(false);

    // TODO: 다음 화면으로 이동
    navigate('/');
  };

  const isNextDisabled = inviteCode.length !== OTP_LENGTH;

  return (
    <OnboardingFlowLayout
      onBack={() => navigate('/onboarding')}
      onNext={handleNext}
      isNextDisabled={isNextDisabled}
      nextLabel={'집 찾기'}
      //   bottomSlot={}
    >
      <div className="pt-4">
        <section className="flex flex-col gap-2 px-2 pb-[188px]">
          <h1 className="text-xl leading-8 font-semibold">
            공유받은 초대코드를
            <br />
            입력해주세요
          </h1>
        </section>

        <section className="flex justify-center px-2">
          <InputOTP
            maxLength={OTP_LENGTH}
            value={inviteCode}
            onChange={handleChangeInviteCode}
            pattern="[0-9*]"
            inputMode="numeric"
          >
            <InputOTPGroup className="gap-2">
              {Array.from({ length: OTP_LENGTH }, (_, index) => (
                <InputOTPSlot
                  index={index}
                  className={cn(
                    'bg-secondary h-[70px] w-[50px] rounded-lg border-none text-xl font-semibold shadow-none',
                    hasError ? 'ring-1 ring-red-500' : 'ring-primary'
                  )}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </section>
      </div>
    </OnboardingFlowLayout>
  );
};

export default JoinHousePage;
