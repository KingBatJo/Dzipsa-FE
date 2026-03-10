import { MOTTO_MAX_LENGTH, MOTTO_TEMPLATES } from '@/constants/onboarding';
import { useRef, useState } from 'react';
import {
  validateRequiredText,
  validateTextMaxLength,
} from '@/utils/validators';

import { Card } from '@/components/ui/card';
import EditableInput from '@/pages/onboarding/components/EditableInput';
import { cn } from '@/lib/utils';

type MottoStepProps = {
  value: string;
  onChange: (value: string) => void;
};

const MottoStep = ({ value, onChange }: MottoStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (nextValue: string) => {
    const maxLengthError = validateTextMaxLength(nextValue, MOTTO_MAX_LENGTH);

    if (maxLengthError) {
      setErrorMessage(maxLengthError);
      return;
    }

    onChange(nextValue);

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleBlur = () => {
    setErrorMessage(validateRequiredText(value));
  };

  return (
    <div className="pt-4">
      <section className="flex flex-col gap-2 px-2 pb-10">
        <h1 className="text-xl font-semibold">
          우리집만의 약속이 필요해요
          <br />
          함께 지키고 싶은 가훈을 골라보세요
        </h1>

        <p className="text-sm font-medium text-[#BCBCBC]">
          가훈은 다시 설정할 수 있어요!
        </p>
      </section>

      {/* 가훈 입력 */}
      <section className="flex flex-col gap-1">
        <EditableInput
          id="motto"
          ref={inputRef}
          value={value}
          placeholder="우리집의 가훈을 정해보세요"
          errorMessage={errorMessage}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="flex justify-end text-xs font-semibold text-[#BCBCBC]">
          최대 {MOTTO_MAX_LENGTH}글자
        </div>
      </section>

      {/* 가훈 템플릿 */}
      <section className="flex flex-col gap-2 pt-5">
        <h2 className="text-xs font-semibold text-[#888888]">가훈 템플릿</h2>

        <div className="flex flex-col gap-2.5">
          {MOTTO_TEMPLATES.map((template) => (
            <Card
              key={template}
              onClick={() => {
                onChange(template);
                setErrorMessage('');
                inputRef.current?.focus();
              }}
              className={cn(
                'flex h-12 cursor-pointer items-center rounded-[10px] px-4 text-sm font-medium shadow-xs transition-all duration-200',
                value === template
                  ? 'border-neutral-900 bg-neutral-100'
                  : 'border-neutral-200 hover:bg-neutral-50'
              )}
            >
              {template}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MottoStep;
