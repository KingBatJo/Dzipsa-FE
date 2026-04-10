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
      'group flex items-center rounded-2xl border p-4 shadow-none transition-colors',
      isDelayed ? 'border-transparent bg-red-200' : 'border-zinc-200 bg-white',
      onClick &&
        (isDelayed
          ? 'hover:cursor-pointer hover:border-red-300 hover:bg-red-200 active:bg-red-300 has-[button:active]:border-none has-[button:active]:bg-red-200 has-[button:hover]:border-none has-[button:hover]:bg-red-200'
          : 'hover:cursor-pointer hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300 has-[button:active]:border-zinc-200 has-[button:active]:bg-white has-[button:hover]:border-zinc-200 has-[button:hover]:bg-white'),
      className
    )}
  >
    <div className="flex min-w-0 flex-1 items-center gap-2">
      {left && <div className="shrink-0">{left}</div>}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-base leading-[19px] font-semibold">{title}</p>

        {(badge || subtitle) && (
          <div className="flex items-center gap-[9px]">
            {isDelayed && badge && (
              <RoundedBadge className="bg-red-400 text-red-50 group-active:bg-red-500">
                {badge}
              </RoundedBadge>
            )}
            {subtitle && (
              <div
                className={cn(
                  'border-l-2 pl-1 text-xs font-medium transition-colors',
                  isDelayed
                    ? 'border-red-400 font-semibold text-red-400 group-active:border-red-500 group-active:text-red-500'
                    : 'border-zinc-400 text-zinc-400'
                )}
              >
                {subtitle}
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    {right && <div className="shrink-0">{right}</div>}
  </Card>
);

export default ListItemCard;
