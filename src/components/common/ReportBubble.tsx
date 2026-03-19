import type { CSSProperties, ReactNode } from 'react';

type ReportBubbleProps = {
  children: ReactNode;
  showPointer?: boolean;
  shadowStyle: CSSProperties;
};

const ReportBubble = ({
  children,
  showPointer = false,
  shadowStyle,
}: ReportBubbleProps) => {
  return (
    <div
      className="relative w-full rounded-2xl bg-white px-[18px] py-4 shadow-(--report-shadow)"
      style={shadowStyle}
    >
      {showPointer && (
        <svg
          viewBox="0 0 17 20"
          fill="none"
          className="absolute top-3 -left-3.5 h-5.5 w-4.5 overflow-visible"
          style={{ filter: 'drop-shadow(var(--report-shadow-drop))' }}
        >
          <path
            d="M2.00332 9.28699e-07C0.311664 9.39956e-07 -0.615362 1.97031 0.462025 3.27452C5.15542 8.95599 8.65608 13.1936 13.2135 18.7105C14.4076 20.156 16.757 19.3135 16.757 17.4386L16.757 2C16.757 0.895431 15.8616 8.36475e-07 14.757 8.43826e-07L2.00332 9.28699e-07Z"
            fill="white"
          />
        </svg>
      )}
      <div className="relative text-xs leading-[1.4] font-semibold text-zinc-600">
        {children}
      </div>
    </div>
  );
};

export default ReportBubble;
