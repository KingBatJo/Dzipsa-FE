import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import OnboardingFlowLayout from '@/pages/onboarding/components/OnboardingFlowLayout';
import { useNavigate } from 'react-router-dom';

const OTP_LENGTH = 6;

const JoinHousePage = () => {
  const navigate = useNavigate();

  return (
    <OnboardingFlowLayout
      onBack={() => navigate('/onboarding')}
      //   onNext={}
      //   isNextDisabled={}
      nextLabel={'집 찾기'}
      //   bottomSlot={}
    >
      <div className="pt-4">
        <section className="flex flex-col gap-2 px-2 pb-10">
          <h1 className="text-xl leading-8 font-semibold">
            공유받은 초대코드를
            <br />
            입력해주세요
          </h1>
        </section>

        <section>
          <InputOTP maxLength={OTP_LENGTH} pattern="[0-9*]" inputMode="numeric">
            <InputOTPGroup className="gap-2">
              {Array.from({ length: OTP_LENGTH }, (_, index) => (
                <InputOTPSlot
                  index={index}
                  className="bg-secondary ring-primary h-[70px] w-[50px] rounded-lg border-none text-xl font-semibold shadow-none"
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
