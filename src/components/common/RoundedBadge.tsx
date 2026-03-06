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
        '!hover:bg-none rounded-full border-none px-[10px] py-[5px] shadow-none',
        className
      )}
    >
      {children}
    </Badge>
  );
};

export default RoundedBadge;
