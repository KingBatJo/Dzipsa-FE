import { cn } from '@/lib/utils';

type EmptyStateProps = {
  message: string;
  className?: string;
};

const EmptyState = ({ message, className }: EmptyStateProps) => {
  return (
    <p className={cn('text-muted-foreground px-1 text-sm', className)}>
      {message}
    </p>
  );
};

export default EmptyState;
