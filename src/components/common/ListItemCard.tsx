import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ListItemCardProps = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const ListItemCard = ({
  title,
  subtitle,
  right,
  onClick,
  className,
}: ListItemCardProps) => (
  <Card
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    className={cn(
      'flex items-center justify-between rounded-md border-[#D4D4D4] p-4',
      className
    )}
  >
    <div className="min-w-0">
      <p className="truncate text-base font-medium">{title}</p>
      {subtitle && (
        <p className="text-muted-foreground text-xs font-normal">{subtitle}</p>
      )}
    </div>
    {right && <div className="shrink-0 pl-3">{right}</div>}
  </Card>
);

export default ListItemCard;
