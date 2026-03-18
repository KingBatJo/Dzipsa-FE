import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getMe } from '@/api/auth/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect } from 'react';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = searchParams.get('accessToken');

      // 토큰이 없으면 로그인 페이지로 이동
      if (!accessToken) {
        clearAuth();
        navigate('/login', {
          replace: true,
          state: {
            loginError: '로그인 처리 중 문제가 발생했어요. 다시 시도해주세요.',
          },
        });
        return;
      }

      // 메모리에 accessToken 저장
      setAccessToken(accessToken);

      // 주소창에서 accessToken 제거
      window.history.replaceState({}, '', window.location.pathname);

      try {
        const me = await getMe();
        setUser(me);

        // 약관 미동의 사용자는 약관 동의 화면으로 이동
        if (!hasAgreedToTerms(me)) {
          navigate('/signup/terms', { replace: true });
          return;
        }

        // 방 미소속 사용자는 온보딩으로 이동
        if (!hasRoom(me)) {
          navigate('/onboarding', { replace: true });
          return;
        }

        navigate('/home', { replace: true });
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        clearAuth();

        navigate('/login', {
          replace: true,
          state: {
            loginError: '사용자 정보를 불러오지 못했어요. 다시 시도해주세요.',
          },
        });
      }
    };

    initializeAuth();
  }, [navigate, searchParams, setAccessToken, setUser, clearAuth]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <p className="text-base font-medium">로그인 처리 중...</p>
    </div>
  );
};

export default AuthCallbackPage;
