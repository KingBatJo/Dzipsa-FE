import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HEADER_HEIGHT, MOBILE_MAX_WIDTH } from '@/constants/layout';

import Bell from '@/assets/bell.svg';
import { CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      className={`fixed top-0 z-10 w-full ${MOBILE_MAX_WIDTH} backdrop-blur-xl`}
    >
      <div
        className={`flex items-center justify-between ${HEADER_HEIGHT} px-4`}
      >
        <h1 className="text-xl font-semibold">
          <Link to="/">Dzipsa</Link>
        </h1>

        <div className="flex items-center gap-2">
          {/* 알림 */}
          <Link to="/notifications" aria-label="알림" className="group">
            <img
              src={Bell}
              alt="알림"
              className="h-8 w-8 group-hover:scale-105"
            />
          </Link>

          {/* 프로필 */}
          <Link to="/mypage" aria-label="마이페이지" className="group">
            <Avatar className="h-8 w-8 group-hover:scale-105">
              <AvatarImage
                src="https://github.com/shadcn.png" // 임시
                alt="프로필"
                className="grayscale"
              />
              <AvatarFallback className="bg-inherit">
                <CircleUserRound className="h-8 w-8 text-[#9C9C9C]" />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
