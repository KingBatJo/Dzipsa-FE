import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleUserRound, LucideUserPlus2 } from 'lucide-react';

import { cn } from '@/lib/utils';

type UserAvatarProps = {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'user' | 'add';
};

const avatarSizes = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-11 w-11',
};

const UserAvatar = ({
  src,
  alt,
  size = 'sm',
  className,
  variant = 'user',
}: UserAvatarProps) => {
  const isAdd = variant === 'add';

  return (
    <Avatar className={cn(avatarSizes[size], className)}>
      {!isAdd && <AvatarImage src={src} alt={alt ?? '유저 프로필'} />}

      <AvatarFallback className="flex items-center justify-center bg-inherit text-[#9C9C9C]">
        {isAdd ? (
          // 유저 추가 아이콘
          <LucideUserPlus2
            className={cn(
              avatarSizes[size],
              'rounded-full border-2 border-dashed'
            )}
          />
        ) : (
          // 유저 기본 fallback 아이콘
          <CircleUserRound className={cn(avatarSizes[size])} />
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
