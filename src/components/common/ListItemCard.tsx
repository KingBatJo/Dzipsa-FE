import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ListItemCardProps = {
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const ListItemCard = ({
  title,
  subtitle,
  left,
  right,
  onClick,
  className,
}: ListItemCardProps) => (
  <Card
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    className={cn(
      'flex items-center rounded-md border-[#D4D4D4] p-4',
      className
    )}
  >
    <div className="flex min-w-0 flex-1 items-center gap-4">
      {left && <div className="shrink-0">{left}</div>}

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-medium">{title}</p>
        {subtitle && (
          <p className="text-muted-foreground text-xs font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    {right && <div className="shrink-0 pl-2">{right}</div>}
  </Card>
);

export default ListItemCard;
