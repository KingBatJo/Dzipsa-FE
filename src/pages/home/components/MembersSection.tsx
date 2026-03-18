import { Link } from 'react-router-dom';
import type { RoomMemberResponse } from '@/api/room/room.types';
import UserAvatar from '@/components/common/UserAvatar';
import { getProfileOptionById } from '@/api/room/room.utils';

type MembersSectionProps = {
  members: RoomMemberResponse[];
};

const MAX_MEMBERS = 6;

const MembersSection = ({ members }: MembersSectionProps) => {
  const canAdd = members.length < MAX_MEMBERS;

  return (
    <section
      aria-label="멤버 목록"
      className="scrollbar-hide mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto py-1"
    >
      {members.map((member) => {
        const profile = getProfileOptionById(member.profileImageUrl);

        return (
          <div key={member.id} className="shrink-0 snap-start">
            <UserAvatar
              size="lg"
              src={profile.imageUrl}
              alt={`${member.nickname} 프로필`}
            />
          </div>
        );
      })}

      {canAdd && (
        <Link
          to="/mypage/invitation"
          aria-label="멤버 추가"
          className="shrink-0 snap-start"
        >
          <UserAvatar size="lg" variant="add" className="hover:bg-muted" />
        </Link>
      )}
    </section>
  );
};

export default MembersSection;
