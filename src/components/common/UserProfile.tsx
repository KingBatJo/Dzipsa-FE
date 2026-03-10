import UserAvatar from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';

type UserProfileProps = {
  src?: string;
  alt?: string;
  name: string;
};

const UserProfile = ({ src, alt, name }: UserProfileProps) => {
  return (
    <div className={cn('flex flex-col items-center gap-1')}>
      <UserAvatar
        src={src}
        alt={alt}
        size="xl"
        className="border border-[#C7CFD7]"
      />

      <span
        className={cn(
          'max-w-[50px] text-center text-[10px] font-semibold text-[#BCBCBC]'
        )}
      >
        {name}님
      </span>
    </div>
  );
};

export default UserProfile;
