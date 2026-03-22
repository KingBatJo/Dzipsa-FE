import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type RoundedBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

const RoundedBadge = ({ children, className }: RoundedBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        'rounded-[8px] border-none px-2 py-1 text-xs shadow-none',
        className
      )}
    >
      {children}
    </Badge>
  );
};

export default RoundedBadge;
