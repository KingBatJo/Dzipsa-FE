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
    <section className={cn('space-y-1 pt-2', className)}>
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {right && <div>{right}</div>}
      </div>

      {/* 리스트 영역 */}
      <div className="space-y-2">{children}</div>
    </section>
  );
};

export default ListSection;
