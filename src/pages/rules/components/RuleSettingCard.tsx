import type { ReactNode } from 'react';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { cn } from '@/lib/utils';

type RuleSettingCardProps = {
  title: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  ariaLabel: string;
  children?: ReactNode;
};

const getToggleSwitchClassName = (checked: boolean) =>
  cn(checked ? undefined : 'bg-zinc-300', 'disabled:opacity-100');

const RuleSettingCard = ({
  title,
  checked,
  onToggle,
  ariaLabel,
  children,
}: RuleSettingCardProps) => {
  return (
    <section className="flex flex-col gap-2.5 rounded-[20px] bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-black">{title}</p>

        <ToggleSwitch
          checked={checked}
          onCheckedChange={onToggle}
          className={getToggleSwitchClassName(checked)}
          ariaLabel={ariaLabel}
        />
      </div>

      {children}
    </section>
  );
};

export default RuleSettingCard;
