import { BOTTOM_NAV_HEIGHT_CLASS, MOBILE_MAX_WIDTH } from '@/constants/layout';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import tabbarHomeOff from '@/assets/icon/tabbar-home-off.svg';
import tabbarHomeOn from '@/assets/icon/tabbar-home-on.svg';
import tabbarRulesOff from '@/assets/icon/tabbar-rules-off.svg';
import tabbarRulesOn from '@/assets/icon/tabbar-rules-on.svg';
import tabbarTodoOff from '@/assets/icon/tabbar-todo-off.svg';
import tabbarTodoOn from '@/assets/icon/tabbar-todo-on.svg';

const navigationItems = [
  {
    label: '할 일',
    path: '/todos',
    iconOff: tabbarTodoOff,
    iconOn: tabbarTodoOn,
  },
  {
    label: '홈',
    path: '/home',
    iconOff: tabbarHomeOff,
    iconOn: tabbarHomeOn,
  },
  {
    label: '규칙',
    path: '/rules',
    iconOff: tabbarRulesOff,
    iconOn: tabbarRulesOn,
  },
];

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav
      className={`fixed bottom-[33px] left-1/2 z-10 w-full -translate-x-1/2 ${MOBILE_MAX_WIDTH}`}
    >
      <div
        className={`mx-auto flex ${BOTTOM_NAV_HEIGHT_CLASS} w-62.5 items-center gap-2 rounded-[68px] border-2 border-white bg-zinc-50 p-1.5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]`}
      >
        {navigationItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-label={item.label}
              className={cn(
                'flex h-full flex-1 items-center justify-center rounded-[32px] transition-colors hover:bg-zinc-100',
                isActive ? 'bg-zinc-200' : 'bg-transparent'
              )}
            >
              <img
                src={isActive ? item.iconOn : item.iconOff}
                alt={item.label}
                className="h-6 w-6"
              />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
