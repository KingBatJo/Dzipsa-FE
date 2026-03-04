import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { CircleUserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserAvatarProps = {
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const avatarSizes = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-11 w-11',
};

const UserAvatar = ({ src, size = 'sm', className }: UserAvatarProps) => {
  return (
    <Avatar className={cn(avatarSizes[size], className)}>
      <AvatarImage src={src} alt="유저 프로필" />
      <AvatarFallback className="bg-inherit">
        <CircleUserRound className={cn(avatarSizes[size], 'text-[#9C9C9C]')} />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
