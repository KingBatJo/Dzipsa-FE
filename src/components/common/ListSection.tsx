import { cn } from '@/lib/utils';

type ListSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const ListSection = ({ title, children, className }: ListSectionProps) => {
  return (
    <section className={cn('space-y-1 pt-2', className)}>
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="space-y-2">{children}</div>
    </section>
  );
};

export default ListSection;
