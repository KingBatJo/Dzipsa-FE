import { BOTTOM_NAV_HEIGHT_CLASS, MOBILE_MAX_WIDTH } from '@/constants/layout';
import { Calendar, Home, List } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

const navigationItems = [
  { label: '할 일', path: '/todos', icon: List },
  { label: '홈', path: '/', icon: Home },
  { label: '규칙', path: '/rules', icon: Calendar },
];

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav
      className={`fixed bottom-4 left-1/2 z-10 -translate-x-1/2 ${MOBILE_MAX_WIDTH} `}
    >
      <div
        className={`flex items-center justify-between rounded-[30px] bg-[#EEEEEE] px-6 ${BOTTOM_NAV_HEIGHT_CLASS}`}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex w-20 flex-col items-center gap-1',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'scale-110')} />
              <span className="text-xs font-normal">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
