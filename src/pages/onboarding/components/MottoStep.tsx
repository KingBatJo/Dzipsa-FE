import { MOTTO_MAX_LENGTH, MOTTO_TEMPLATES } from '@/constants/onboarding';
import { useRef, useState } from 'react';
import {
  validateRequiredText,
  validateTextMaxLength,
} from '@/utils/validators';

import AppButton from '@/components/common/AppButton';
import EditableInputSection from '@/components/form/EditableInputSection';
import { cn } from '@/lib/utils';

type MottoStepProps = {
  motto: string;
  onChangeMotto: (value: string) => void;
};

const MottoStep = ({ motto, onChangeMotto }: MottoStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (nextValue: string) => {
    const maxLengthError = validateTextMaxLength(nextValue, MOTTO_MAX_LENGTH);

    if (maxLengthError) {
      setErrorMessage(maxLengthError);
      return;
    }

    onChangeMotto(nextValue);

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleBlur = () => {
    setErrorMessage(validateRequiredText(motto));
  };

  return (
    <div>
      <section className="flex flex-col gap-1 p-7.5">
        <h1 className="text-xl leading-[1.4] font-semibold">
          우리집만의 약속이 필요해요.
          <br />
          함께 지키고 싶은 가훈을 골라보세요.
        </h1>

        <p className="text-sm font-medium text-zinc-400">
          가훈은 다시 설정할 수 있어요!
        </p>
      </section>

      {/* 가훈 입력 */}
      <div className="px-[15px] pt-[15px] pb-7.5">
        <EditableInputSection
          id="motto"
          value={motto}
          placeholder="우리집 가훈을 입력하세요"
          maxLength={MOTTO_MAX_LENGTH}
          errorMessage={errorMessage}
          onChange={handleChange}
          onBlur={handleBlur}
          inputRef={inputRef}
        />
      </div>

      {/* 가훈 템플릿 */}
      <section className="flex flex-col gap-3 p-[15px]">
        <h2 className="text-xs font-semibold text-zinc-400">가훈 템플릿</h2>

        <div className="flex flex-col gap-2.5">
          {MOTTO_TEMPLATES.map((template) => (
            <AppButton
              key={template}
              onClick={() => {
                onChangeMotto(template);
                setErrorMessage('');
                inputRef.current?.focus();
              }}
              className={cn(
                'border-border flex items-center border px-4 py-2 shadow-xs transition-all duration-200',
                motto === template
                  ? 'border-zinc-500 bg-zinc-300'
                  : 'hover:border-zinc-400 hover:bg-zinc-200 active:border-zinc-500 active:bg-zinc-300'
              )}
            >
              {template}
            </AppButton>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MottoStep;
