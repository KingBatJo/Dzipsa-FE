import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SpeechBubbleProps = {
  children: ReactNode;
  className?: string;
  showTail?: boolean;
};

const SpeechBubble = ({
  children,
  className,
  showTail = true,
}: SpeechBubbleProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'rounded-2xl bg-white px-3 py-2.5 text-center shadow-[0_0_10px_0_rgba(189,189,189,0.3)]',
          className
        )}
      >
        <div className="space-y-2 text-sm leading-[1.3] font-semibold">
          {children}
        </div>
      </div>

      {showTail && (
        <div className="h-0 w-0 border-x-[16px] border-t-[20px] border-x-transparent border-t-white drop-shadow-[0_3px_3px_rgba(189,189,189,0.25)]" />
      )}
    </div>
  );
};

export default SpeechBubble;
