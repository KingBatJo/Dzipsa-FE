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
    <div className="flex flex-col gap-[155px]">
      <section className="flex flex-col gap-2 p-7.5">
        <h1 className="text-xl font-semibold">
          공유받은 초대 코드를
          <br />
          입력해 주세요
        </h1>
      </section>

      <section className="flex justify-center px-5 py-2.5">
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
    </div>
  );
};

export default InviteCodeInputStep;
