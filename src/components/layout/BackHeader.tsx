import { ChevronLeft } from 'lucide-react';
import { FORM_HEADER_HEIGHT_CLASS } from '@/constants/layout';

type BackHeaderProps = {
  onBack: () => void;
  title?: string;
  rightSlot?: React.ReactNode;
};

const BackHeader = ({ onBack, title, rightSlot }: BackHeaderProps) => {
  return (
    <header
      className={`${FORM_HEADER_HEIGHT_CLASS} fixed top-0 flex w-full items-center justify-between bg-white p-[15px]`}
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로가기"
        className="h-6 w-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex w-10 justify-end">{rightSlot}</div>
    </header>
  );
};

export default BackHeader;
