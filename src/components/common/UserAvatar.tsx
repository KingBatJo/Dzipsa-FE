import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { LucideUserPlus2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserAvatarProps = {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'user' | 'add';
};

const avatarSizes = {
  xs: 'h-5 w-5',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-11 w-11',
  xl: 'h-[50px] w-[50px]',
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
    <Avatar
      className={cn(
        'border-[0.4px] border-zinc-300',
        avatarSizes[size],
        className
      )}
    >
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
          // 유저 기본 fallback
          <div className="bg-secondary h-full w-full"></div>
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
