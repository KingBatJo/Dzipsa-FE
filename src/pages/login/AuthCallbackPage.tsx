import { useNavigate, useSearchParams } from 'react-router-dom';

import { getMe } from '@/api/auth/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect } from 'react';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = searchParams.get('accessToken');
      const created = searchParams.get('created');

      const { setAccessToken, setUser } = useAuthStore.getState();

      // 토큰이 없으면 로그인 페이지로 이동
      if (!accessToken) {
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

        // 신규 유저일 경우 약관 동의
        if (created === 'true') {
          navigate('/login', {
            replace: true,
            state: {
              openTermsSheet: true,
            },
          });
          return;
        }

        navigate('/onboarding', { replace: true });
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);

        navigate('/login', {
          replace: true,
          state: {
            loginError: '사용자 정보를 불러오지 못했어요. 다시 시도해주세요.',
          },
        });
      }
    };

    initializeAuth();
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <p className="text-base font-medium">로그인 처리 중...</p>
    </div>
  );
};

export default AuthCallbackPage;
