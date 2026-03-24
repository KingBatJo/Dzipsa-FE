const MottoSection = ({ motto }: { motto: string }) => {
  return (
    <section className="p-2.5">
      <div className="relative flex h-11 items-center justify-center rounded-[10px] bg-white px-2.5 shadow-[0_4px_4px_0_rgba(223,223,223,0.30)]">
        <div className="absolute top-[-6px] left-[9px] z-1 h-[6px] w-[5px] bg-[#40B188] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
        <div className="absolute top-[-9px] left-[13px] z-2 rounded-[5px] bg-[#82DFBD] px-2 py-1">
          <p className="text-xs leading-3.5 font-bold text-white">
            우리집 가훈
          </p>
        </div>

        <p className="leading- max-w-full truncate text-center text-base font-semibold">
          {motto}
        </p>
      </div>
    </section>
  );
};

export default MottoSection;
