import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { OTP_LENGTH } from '@/constants/onboarding';
import { cn } from '@/lib/utils';

type InviteCodeInputStepProps = {
  inviteCode: string;
  hasError: boolean;
  onChangeInviteCode: (value: string) => void;
};

const InviteCodeInputStep = ({
  inviteCode,
  hasError,
  onChangeInviteCode,
}: InviteCodeInputStepProps) => {
  return (
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
          onChange={onChangeInviteCode}
          pattern="[0-9]*"
          inputMode="numeric"
        >
          <InputOTPGroup className="gap-2">
            {Array.from({ length: OTP_LENGTH }, (_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className={cn(
                  'bg-secondary h-[70px] w-[50px] rounded-lg border-none text-xl font-semibold shadow-none',
                  hasError ? 'ring-destructive ring-1' : 'ring-primary'
                )}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </section>

      {/* 임시 (테스트용 안내 문구) */}
      <p className="pt-4 text-center text-xs text-neutral-400">
        테스트용 초대코드: 123456
      </p>
    </div>
  );
};

export default InviteCodeInputStep;
