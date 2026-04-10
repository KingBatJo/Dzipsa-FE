import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type EmptyStateProps = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'card' | 'minimal';
  align?: 'center' | 'left';
  className?: string;
};

const EmptyState = ({
  children,
  title,
  description,
  image,
  action,
  variant = 'card',
  align = 'center',
  className,
}: EmptyStateProps) => {
  const hasPresetContent = title || description || image || action;
  const content = hasPresetContent ? (
    <>
      {image}
      {(title || description) && (
        <div
          className={cn(
            'text-sm text-zinc-500',
            align === 'center' ? 'text-center' : 'text-left'
          )}
        >
          {title && (
            <p className="text-primary text-xl font-semibold">{title}</p>
          )}
          {description && (
            <p className="text-sm font-semibold text-zinc-400">{description}</p>
          )}
        </div>
      )}
      {action}
    </>
  ) : (
    children
  );

  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'flex min-h-[50dvh] items-center justify-center',
          className
        )}
      >
        <div className="flex w-full flex-col items-center gap-3">{content}</div>
      </div>
    );
  }

  return (
    <Card className={cn('border-none p-5 shadow-none', className)}>
      <div className="flex flex-col items-center gap-5">{content}</div>
    </Card>
  );
};

export default EmptyState;
