import { Outlet, useLocation } from 'react-router-dom';
import { getMe, refresh } from '@/api/auth/auth.api';
import { useEffect, useRef, useState } from 'react';

import loading from '@/assets/image/loading.png';
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
        <div className="flex flex-col gap-[24px] px-[15px]">
          <img src={loading} alt="" className="h-[215px] w-[250px]" />

          <div className="flex flex-col items-center gap-1">
            <p className="text-xl font-semibold">디집사가 치우는 중...</p>
            <p className="text-sm font-semibold text-[#BCBCBC]">
              잠시만 기다려주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default AuthInitializer;
