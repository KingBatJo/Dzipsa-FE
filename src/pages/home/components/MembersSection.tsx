import type { Member } from '@/types/member';
import UserAvatar from '@/components/common/UserAvatar';

type MembersSectionProps = {
  members: Member[];
};

const MembersSection = ({ members }: MembersSectionProps) => {
  return (
    <section
      aria-label="멤버 목록"
      className="scrollbar-hide mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto py-1"
    >
      {members.map((member) => (
        <div key={member.id} className="shrink-0 snap-start">
          <UserAvatar size="lg" src={member.profileImage} />
        </div>
      ))}
    </section>
  );
};

export default MembersSection;
