import { Card } from '@/components/ui/card';

const HomeMottoSection = ({ motto }: { motto: string }) => {
  return (
    <section className="text-center">
      <Card className="rounded-[9px] border-none px-2 py-3">
        <p className="text-base font-semibold">{motto}</p>
      </Card>
    </section>
  );
};

export default HomeMottoSection;
