import AppButton from '@/components/common/AppButton';
import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import dzipsaCharacter from '@/assets/dzipsa.svg';

export type RandomAssignStage = 'loading' | 'result';

type RandomAssignOverlayProps = {
  stage: RandomAssignStage;
  candidateName?: string;
  onClose: () => void;
  onConfirm: () => void;
};

const RandomAssignOverlay = ({
  stage,
  candidateName,
  onClose,
  onConfirm,
}: RandomAssignOverlayProps) => {
  return (
    <div
      className={cn(
        'fixed inset-y-0 left-1/2 z-10 flex h-full w-full -translate-x-1/2 flex-col bg-white px-4',
        MOBILE_MAX_WIDTH
      )}
    >
      <div className="flex h-[64px] items-center justify-end">
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center"
          aria-label="랜덤 배정 닫기"
        >
          <X className="h-5 w-5 text-neutral-700" />
        </button>
      </div>

      {stage === 'loading' && (
        <div className="flex flex-1 flex-col items-center pt-[120px]">
          <img
            src={dzipsaCharacter}
            alt="랜덤 배정 로딩"
            className="h-[188px] w-[213px]"
          />
          <p className="mt-[63px] text-lg font-semibold">돌아가는 중...</p>
        </div>
      )}

      {stage === 'result' && candidateName && (
        <div className="flex flex-1 flex-col items-center pt-[120px]">
          <img
            src={dzipsaCharacter}
            alt="랜덤 배정 결과"
            className="h-[188px] w-[213px]"
          />

          <p className="mt-[63px] text-lg font-semibold">
            랜덤배정이 완료됐어요
            <br />'{candidateName}'님이 당첨됐어요.
          </p>

          <div className="mt-auto w-full pb-18">
            <AppButton
              onClick={onConfirm}
              className="text-primary-foreground from-primary bg-gradient-to-r to-zinc-500 text-sm font-medium"
            >
              랜덤배정 담당자 등록하기
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomAssignOverlay;
