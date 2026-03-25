import { FORM_HEADER_HEIGHT, MOBILE_MAX_WIDTH } from '@/constants/layout';

import AppButton from '@/components/common/AppButton';
import BackHeader from '@/components/layout/BackHeader';

type OnboardingFlowLayoutProps = {
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  isNextDisabled?: boolean;
  bottomSlot?: React.ReactNode;
};

const OnboardingFlowLayout = ({
  children,
  onBack,
  onNext,
  nextLabel,
  isNextDisabled = false,
  bottomSlot,
}: OnboardingFlowLayoutProps) => {
  return (
    <div>
      <BackHeader onBack={onBack} />

      <div className="pb-[108px]" style={{ paddingTop: FORM_HEADER_HEIGHT }}>
        {children}
      </div>

      <footer
        className={`fixed bottom-0 ${MOBILE_MAX_WIDTH} w-full bg-white px-[15px] pt-2.5 pb-12.5`}
      >
        <div className="flex flex-col gap-[10px]">
          <AppButton
            onClick={onNext}
            disabled={isNextDisabled}
            className="bg-zinc-800 text-zinc-100 hover:bg-zinc-900"
          >
            {nextLabel}
          </AppButton>

          {bottomSlot}
        </div>
      </footer>
    </div>
  );
};

export default OnboardingFlowLayout;
