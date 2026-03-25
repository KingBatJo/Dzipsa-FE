import { Skeleton } from '@/components/ui/skeleton';

type MottoSectionProps = {
  motto: string;
  isLoading?: boolean;
};

const MottoSection = ({ motto, isLoading = false }: MottoSectionProps) => {
  return (
    <section className="p-2.5">
      <div className="relative flex h-11 items-center justify-center rounded-[10px] bg-white px-2.5 shadow-[0_4px_4px_0_rgba(223,223,223,0.30)]">
        <div className="absolute left-[9px] top-[-6px] z-[1] h-[6px] w-[5px] bg-[#40B188] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
        <div className="absolute left-[13px] top-[-9px] z-[2] rounded-[5px] bg-[#82DFBD] px-2 py-1">
          <p className="text-xs font-bold leading-3.5 text-white">우리집 가훈</p>
        </div>

        {isLoading ? (
          <Skeleton className="h-5 w-52 bg-zinc-200/80" />
        ) : (
          <p className="max-w-full truncate text-center text-base font-semibold">
            {motto}
          </p>
        )}
      </div>
    </section>
  );
};

export default MottoSection;
