import { Card } from '@/components/ui/card';

const HomeMottoSection = ({ motto }: { motto: string }) => {
  return (
    <section className="text-center">
      <Card className="rounded-md border border-[#BDBDBD] bg-[#EEEEEE] px-2 py-4">
        <p className="text-base font-semibold">{motto}</p>
      </Card>
    </section>
  );
};

export default HomeMottoSection;
