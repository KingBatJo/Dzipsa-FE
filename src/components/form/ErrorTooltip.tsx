import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ErrorTooltipProps = {
  message?: string;
  children: React.ReactNode;
};

const ErrorTooltip = ({ message, children }: ErrorTooltipProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={Boolean(message)}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent
          side="top"
          align="start"
          sideOffset={6}
          className="relative overflow-visible rounded-lg bg-[#6B6B6B] px-3 py-1.5 text-sm font-medium text-white"
        >
          <p>{message}</p>

          <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-[#6B6B6B]" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ErrorTooltip;
