import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { HEADER_HEIGHT_CLASS } from '@/constants/layout';

type BackHeaderProps = {
  onBack: () => void;
  title?: string;
  rightSlot?: React.ReactNode;
};

const BackHeader = ({ onBack, title, rightSlot }: BackHeaderProps) => {
  return (
    <header
      className={`${HEADER_HEIGHT_CLASS} flex items-center justify-between p-4`}
    >
      <Button
        type="button"
        onClick={onBack}
        aria-label="뒤로가기"
        variant="ghost"
        className="h-fit p-1.5"
      >
        <ChevronLeft />
      </Button>

      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex w-10 justify-end">{rightSlot}</div>
    </header>
  );
};

export default BackHeader;
