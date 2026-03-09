import { useRef, useState } from 'react';

import { Card } from '@/components/ui/card';
import EditableInput from './EditableInput';
import { cn } from '@/lib/utils';

const MOTTO_TEMPLATES = [
  '미루지 말고 지금 하자',
  '눈치보지 말고 말하자',
  '먹은 자가 치우자',
  '남이지만 존중 필수',
  '내 건 내가 사자',
] as const;

const MottoStep = () => {
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

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
          maxLength={20}
          onChange={setValue}
        />

        <div className="flex justify-end text-xs font-semibold text-[#BCBCBC]">
          최대 20글자
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
                setValue(template);
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
