import AppButton from '@/components/common/AppButton';
import BackHeader from '@/components/layout/BackHeader';
import { MOBILE_MAX_WIDTH } from '@/constants/layout';

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

      <div className="px-4 pb-40">{children}</div>

      <footer className={`fixed bottom-0 ${MOBILE_MAX_WIDTH} w-full pb-9`}>
        <div className="flex flex-col gap-6 px-4">
          <AppButton
            onClick={onNext}
            disabled={isNextDisabled}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-full rounded-[10px]"
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
