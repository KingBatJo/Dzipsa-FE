import { HEADER_HEIGHT_CLASS, MOBILE_MAX_WIDTH } from '@/constants/layout';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

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
      <header className={`${HEADER_HEIGHT_CLASS} flex items-center p-4`}>
        <Button
          type="button"
          onClick={onBack}
          aria-label="뒤로가기"
          variant="ghost"
          className="h-fit p-1.5"
        >
          <ChevronLeft />
        </Button>
      </header>

      <div className="px-4">{children}</div>

      <footer className={`fixed bottom-0 ${MOBILE_MAX_WIDTH} w-full pb-9`}>
        <div className="flex flex-col gap-6 px-4">
          <Button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled}
            className="h-12 w-full rounded-[10px]"
          >
            {nextLabel}
          </Button>

          {bottomSlot}
        </div>
      </footer>
    </div>
  );
};

export default OnboardingFlowLayout;
