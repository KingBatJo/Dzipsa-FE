import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, CircleUserRound } from 'lucide-react';
import { HEADER_HEIGHT, MOBILE_MAX_WIDTH } from '@/constants/layout';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={`fixed top-0 z-10 w-full ${MOBILE_MAX_WIDTH} `}>
      <div
        className={`flex items-center justify-between ${HEADER_HEIGHT} px-4`}
      >
        <h1 className="text-xl font-semibold">
          <Link to="/">Dzipsa</Link>
        </h1>

        <div className="flex items-center gap-2">
          {/* 알림 */}
          <Bell className="h-8 w-8 text-[#9C9C9C]" />

          {/* 프로필 */}
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://github.com/shadcn.png" // 임시
              draggable={false}
              alt="프로필"
              className="grayscale"
            />
            <AvatarFallback className="bg-inherit">
              <CircleUserRound className="h-8 w-8 text-[#9C9C9C]" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
