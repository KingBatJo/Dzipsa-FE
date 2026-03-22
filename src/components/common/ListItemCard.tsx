import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ListItemCardProps = {
  title: string;
  subtitle?: React.ReactNode;
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
      'flex items-center rounded-2xl border-zinc-200 bg-white p-4 shadow-none transition-colors',
      onClick &&
        'hover:cursor-pointer hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300 has-[button:active]:border-zinc-200 has-[button:active]:bg-white has-[button:hover]:border-zinc-200 has-[button:hover]:bg-white',
      className
    )}
  >
    <div className="flex min-w-0 flex-1 items-center gap-4">
      {left && <div className="shrink-0">{left}</div>}

      <div className="min-w-0 flex-1 space-y-2">
        <p className="text-base font-semibold">{title}</p>
        {subtitle && (
          <div className="text-muted-foreground text-xs font-semibold">
            {subtitle}
          </div>
        )}
      </div>
    </div>

    {right && <div className="shrink-0">{right}</div>}
  </Card>
);

export default ListItemCard;
