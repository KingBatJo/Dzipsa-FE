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
    onClick={(event) => {
      if (!onClick) return;
      event.currentTarget.blur();
      onClick();
    }}
    className={cn(
      'flex items-center rounded-2xl border-zinc-200 bg-white p-4 shadow-none',
      onClick &&
        'hover:cursor-pointer hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300 has-[button:hover]:border-zinc-200 has-[button:hover]:bg-white has-[button:active]:border-zinc-200 has-[button:active]:bg-white',
      className
    )}
  >
    <div className="flex min-w-0 flex-1 items-center gap-4">
      {left && <div className="shrink-0">{left}</div>}

      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate text-sm font-semibold">{title}</p>
        {subtitle && (
          <p className="text-muted-foreground text-[10px] font-semibold">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    {right && <div className="shrink-0 pl-2">{right}</div>}
  </Card>
);

export default ListItemCard;
