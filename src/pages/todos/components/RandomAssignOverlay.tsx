import AppButton from '@/components/common/AppButton';
import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import randomComplete from '@/assets/random/random-complete.png';
import randomCompleteBackground from '@/assets/random/random-complete-background.png';
import randomLoading from '@/assets/random/random-loading.png';

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
  const isLoadingStage = stage === 'loading';
  const selectedCandidateName = candidateName ?? '담당자';

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-1/2 z-50 flex h-full w-full -translate-x-1/2 flex-col',
        isLoadingStage
          ? 'bg-gradient-to-t from-white from-[37.3%] to-[#E9F3FD]'
          : 'bg-[#F8FAF9]',
        MOBILE_MAX_WIDTH
      )}
    >
      <div className="flex h-[54px] items-center justify-between px-[15px]">
        <div className="h-6 w-6" />

        <h1 className="text-center text-lg leading-[normal] font-semibold text-zinc-900">
          랜덤 배정
        </h1>

        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center"
          aria-label="랜덤 배정 닫기"
        >
          <X className="h-5 w-5 text-zinc-700" />
        </button>
      </div>

      {isLoadingStage && (
        <div className="animate-in fade-in-0 flex flex-1 flex-col items-center px-[15px] pt-[176px] duration-300">
          <img
            src={randomLoading}
            alt="랜덤 배정 로딩"
            className="h-[271px] w-[283px] object-contain motion-safe:animate-[wiggle-soft_0.5s_ease-in-out_infinite]"
          />

          <div className="flex w-[232px] flex-col items-center gap-1 text-center">
            <p className="text-[20px] leading-[1.3] font-semibold text-black">
              운명 결정 중...
            </p>
            <p className="text-sm leading-[1.3] font-semibold text-[#BCBCBC]">
              디집사가 공정한 배정을 진행하고 있습니다
            </p>
          </div>
        </div>
      )}

      {stage === 'result' && (
        <div className="relative flex flex-1 flex-col">
          <div className="animate-in fade-in-0 pointer-events-none absolute top-[54px] left-1/2 h-[416px] w-[375px] -translate-x-1/2 overflow-hidden duration-300">
            <img
              src={randomCompleteBackground}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center px-[15px] pt-[170px]">
            <img
              src={randomComplete}
              alt="랜덤 배정 결과"
              className="animate-in zoom-in-95 fade-in-0 h-[250px] w-[256px] object-contain duration-300"
            />

            <div className="animate-in slide-in-from-bottom-2 fade-in-0 mt-[27px] flex w-full flex-col items-center gap-2 text-center duration-300">
              <p className="w-[296px] text-[18px] leading-[1.3] font-semibold text-black">
                랜덤 배정 완료 !
              </p>
              <p className="w-[296px] text-[18px] leading-[1.3] font-semibold text-black">
                오늘의 주인공은 '{selectedCandidateName}'님
              </p>
            </div>
          </div>

          <div className="animate-in slide-in-from-bottom-2 fade-in-0 z-10 mt-auto px-[15px] pt-[10px] pb-[50px] duration-300">
            <AppButton
              onClick={onConfirm}
              className="from-primary bg-gradient-to-r to-zinc-500 text-sm font-medium text-zinc-100"
            >
              랜덤 배정 담당자 등록하기
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomAssignOverlay;
