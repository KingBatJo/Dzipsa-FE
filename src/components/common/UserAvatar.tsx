import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Plus } from 'lucide-react';
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
    <Avatar className={cn(avatarSizes[size], className)}>
      {!isAdd && <AvatarImage src={src} alt={alt ?? '유저 프로필'} />}

      <AvatarFallback className="flex items-center justify-center">
        {isAdd ? (
          // 유저 추가 아이콘
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-zinc-400 bg-zinc-200 p-1 transition-colors hover:bg-zinc-300"
          >
            <Plus className="h-4.5 w-4.5 text-zinc-400" />
          </button>
        ) : (
          // 유저 기본 fallback
          <div className="bg-secondary h-full w-full"></div>
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
