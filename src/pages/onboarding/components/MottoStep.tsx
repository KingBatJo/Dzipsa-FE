import { useRef, useState } from 'react';

import ClearX from '@/assets/icon/clear_x.svg';
import { Edit3 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MottoStep = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <div className="pt-4">
      <div className="flex flex-col gap-2 px-2 pb-10">
        <h1 className="text-xl font-semibold">
          우리방만의 약속이 필요해요
          <br />
          함께 지키고 싶은 가훈을 골라보세요
        </h1>

        <p className="text-sm font-medium text-[#BCBCBC]">
          가훈은 다시 설정할 수 있어요!
        </p>
      </div>

      {/* 가훈 입력 */}
      <div className="flex flex-col gap-1">
        <div className="bg-secondary flex h-12 items-center rounded-[10px] border border-neutral-200 px-4 shadow focus-within:border-neutral-900">
          <Input
            ref={inputRef}
            value={value}
            type="text"
            placeholder="우리방의 가훈을 정해보세요"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 border-none p-0 text-sm font-medium shadow-none focus-visible:ring-0"
          />

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={isFocused ? handleClear : handleEdit}
            aria-label={isFocused ? '입력값 지우기' : '수정'}
          >
            {isFocused ? (
              <img src={ClearX} className="h-4 w-4" />
            ) : (
              <Edit3 className="h-4 w-4 text-[#AFAFAF]" />
            )}
          </button>
        </div>

        <div className="flex justify-end text-xs font-semibold text-[#BCBCBC]">
          최대 20글자
        </div>
      </div>
    </div>
  );
};

export default MottoStep;
