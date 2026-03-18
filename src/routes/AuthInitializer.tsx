import { Outlet, useLocation } from 'react-router-dom';
import { getMe, refresh } from '@/api/auth/auth.api';
import { useEffect, useRef, useState } from 'react';

import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/stores/auth.store';

const AuthInitializer = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const hasInitialized = useRef(false);
  const { pathname } = useLocation();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    // 이미 초기화가 진행되었으면 중복 실행 방지
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if (pathname.startsWith('/auth/callback')) {
      setAuthChecked(true);
      setIsInitializing(false);
      return;
    }

    const initializeAuth = async () => {
      try {
        const { accessToken } = await refresh();
        setAccessToken(accessToken);

        await queryClient.fetchQuery({
          queryKey: queryKeys.auth.me,
          queryFn: getMe,
        });
      } catch (error) {
        console.error('초기 인증 실패:', error);
        clearAuth();
      } finally {
        setAuthChecked(true);
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [pathname, setAccessToken, setAuthChecked, clearAuth]);

  if (isInitializing) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-base font-medium">불러오는 중...</p>
      </div>
    );
  }

  return <Outlet />;
};

export default AuthInitializer;
