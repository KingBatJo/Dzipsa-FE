import { HEADER_HEIGHT_CLASS, MOBILE_MAX_WIDTH } from '@/constants/layout';

import Bell from '@/assets/icon/bell.svg';
import { Link } from 'react-router-dom';
import { PROFILE_IMAGE } from '@/mocks/mockData';
import UserAvatar from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';

type HeaderProps = {
  title: string;
  showActions?: boolean;
  variant?: 'default' | 'white' | 'transparent';
};

const Header = ({
  title,
  showActions = false,
  variant = 'default',
}: HeaderProps) => {
  return (
    <header
      className={cn(
        'fixed top-0 z-10 w-full',
        variant !== 'transparent' && 'backdrop-blur-xl',
        variant === 'white' ? 'bg-white/60' : 'bg-transparent',
        MOBILE_MAX_WIDTH
      )}
    >
      <div
        className={`flex items-center justify-between ${HEADER_HEIGHT_CLASS} p-[15px]`}
      >
        <h1 className="text-[28px] font-semibold text-zinc-900">{title}</h1>

        {showActions && (
          <div className="flex items-center gap-2">
            {/* 알림 */}
            <Link to="/notifications" aria-label="알림">
              <img src={Bell} alt="알림" className="h-8 w-8 hover:scale-105" />
            </Link>

            {/* 프로필 */}
            <Link to="/mypage" aria-label="마이페이지">
              <UserAvatar
                src={PROFILE_IMAGE}
                size="md"
                className="transition-transform hover:scale-105"
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
