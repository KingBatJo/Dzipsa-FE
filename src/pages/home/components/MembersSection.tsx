import { Link } from 'react-router-dom';
import type { RoomMemberResponse } from '@/api/room/room.types';
import { Skeleton } from '@/components/ui/skeleton';
import UserAvatar from '@/components/common/UserAvatar';
import { getProfileOptionById } from '@/api/room/room.utils';

type MembersSectionProps = {
  members: RoomMemberResponse[];
  isLoading?: boolean;
};

const MAX_MEMBERS = 6;

const MembersSection = ({
  members,
  isLoading = false,
}: MembersSectionProps) => {
  if (isLoading) {
    return (
      <section
        aria-label="멤버 목록"
        className="scrollbar-hide overflow-x-auto"
      >
        <div className="flex w-max gap-1.5 px-[15px]">
          <Skeleton className="h-8 w-20 rounded-[33px] bg-zinc-200/80" />
          <Skeleton className="h-8 w-20 rounded-[33px] bg-zinc-200/80" />
        </div>
      </section>
    );
  }

  const canAdd = members.length < MAX_MEMBERS;

  return (
    <section aria-label="멤버 목록" className="scrollbar-hide overflow-x-auto">
      <div className="flex w-max snap-x snap-mandatory gap-1.5 px-[15px]">
        {members.map((member) => {
          const profile = getProfileOptionById(member.profileImageUrl);

          return (
            <div
              key={member.id}
              className="flex shrink-0 snap-start items-center gap-1 rounded-[33px] bg-white py-1 pr-2 pl-1"
            >
              <UserAvatar
                size="sm"
                src={profile.imageUrl}
                alt={`${member.nickname} 프로필`}
              />

              <p className="max-w-14 truncate text-xs font-semibold text-zinc-400">
                {member.nickname}님
              </p>
            </div>
          );
        })}

        {canAdd && (
          <Link
            to="/mypage/invitation"
            aria-label="멤버 추가"
            className="shrink-0 snap-start"
          >
            <UserAvatar size="md" variant="add" className="hover:bg-muted" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default MembersSection;
