import { Button } from '@/components/ui/button';

type Member = {
  id: string;
  name: string;
};

const HomeMembersSection = ({ members }: { members: Member[] }) => {
  return (
    <section className="scrollbar-hide mx-1 flex gap-2 overflow-x-auto">
      {members.map((member) => (
        <Button
          key={member.id}
          className="h-8 shrink-0 rounded-md bg-[#393939] px-3 text-sm font-medium"
        >
          {member.name}
        </Button>
      ))}
    </section>
  );
};

export default HomeMembersSection;
