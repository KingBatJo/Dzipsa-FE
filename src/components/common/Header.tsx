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

        <div className="flex gap-2">
          <div>종</div>
          <div>프로필</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
