import { cn } from '@/lib/utils';

type ListSectionProps = {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
};

const ListSection = ({
  title,
  children,
  right,
  className,
}: ListSectionProps) => {
  return (
    <section className={cn('flex flex-col gap-3', className)}>
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-500">{title}</h2>
        {right && <div>{right}</div>}
      </div>

      {/* 리스트 영역 */}
      <div>{children}</div>
    </section>
  );
};

export default ListSection;
