import { getMe, refresh } from '@/api/auth/auth.api';
import { useEffect, useRef, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/stores/auth.store';

const AuthInitializer = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const hasInitialized = useRef(false);

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    // 이미 초기화가 진행되었으면 중복 실행 방지
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeAuth = async () => {
      try {
        const { accessToken } = await refresh();
        setAccessToken(accessToken);

        const me = await queryClient.fetchQuery({
          queryKey: queryKeys.me,
          queryFn: getMe,
        });

        setUser(me);
      } catch (error) {
        console.error('초기 인증 실패:', error);
        clearAuth();
      } finally {
        setAuthChecked(true);
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [setAccessToken, setUser, setAuthChecked, clearAuth]);

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
