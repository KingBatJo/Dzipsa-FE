import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type EmptyStateProps = {
  message: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const EmptyState = ({ message, children, className }: EmptyStateProps) => {
  return (
    <Card className="border-none p-5 shadow-none">
      <div className="flex flex-col gap-5">
        <p
          className={cn(
            'text-center text-sm font-semibold text-zinc-500',
            className
          )}
        >
          {message}
        </p>

        {children && <div>{children}</div>}
      </div>
    </Card>
  );
};

export default EmptyState;
