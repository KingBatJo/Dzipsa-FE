import { Link } from 'react-router-dom';
import type { Member } from '@/types/member';
import UserAvatar from '@/components/common/UserAvatar';

type MembersSectionProps = {
  members: Member[];
};

const MAX_MEMBERS = 6;

const MembersSection = ({ members }: MembersSectionProps) => {
  const canAdd = members.length < MAX_MEMBERS;

  return (
    <section
      aria-label="멤버 목록"
      className="scrollbar-hide mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto py-1"
    >
      {members.map((member) => (
        <div key={member.id} className="shrink-0 snap-start">
          <UserAvatar
            size="lg"
            src={member.profileImage}
            alt={`${member.name} 프로필`}
          />
        </div>
      ))}

      {canAdd && (
        // 임시. 추후 초대 코드로 연결
        <Link to="/" aria-label="멤버 추가" className="shrink-0 snap-start">
          <UserAvatar size="lg" variant="add" className="hover:bg-muted" />
        </Link>
      )}
    </section>
  );
};

export default MembersSection;
