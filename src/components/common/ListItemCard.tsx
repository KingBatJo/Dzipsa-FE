import { Card } from '@/components/ui/card';
import RoundedBadge from './RoundedBadge';
import { cn } from '@/lib/utils';

type ListItemCardProps = {
  title: string;
  subtitle?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isDelayed?: boolean;
  badge?: string;
};

const ListItemCard = ({
  title,
  subtitle,
  left,
  right,
  onClick,
  className,
  isDelayed,
  badge,
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
      'group flex items-center rounded-2xl p-4 shadow-none transition-colors',
      isDelayed ? 'border-none bg-red-200' : 'border-zinc-200 bg-white',
      onClick &&
        'hover:cursor-pointer hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300 has-[button:active]:border-zinc-200 has-[button:active]:bg-white has-[button:hover]:border-zinc-200 has-[button:hover]:bg-white',
      className
    )}
  >
    <div className="flex min-w-0 flex-1 items-center gap-4">
      {left && <div className="shrink-0">{left}</div>}

      <div className="min-w-0 flex-1 space-y-2">
        <p className="text-base font-semibold">{title}</p>

        <div className="flex items-center gap-[9px]">
          {badge && (
            <RoundedBadge className="bg-red-400 text-red-50">
              {badge}
            </RoundedBadge>
          )}
          {subtitle && (
            <div
              className={cn(
                'border-l-2 pl-1 text-xs font-medium',
                isDelayed
                  ? 'border-red-400 font-semibold text-red-400'
                  : 'border-zinc-400 text-zinc-400'
              )}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>

    {right && <div className="shrink-0">{right}</div>}
  </Card>
);

export default ListItemCard;
