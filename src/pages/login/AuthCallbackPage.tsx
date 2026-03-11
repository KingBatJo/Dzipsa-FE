import { useNavigate, useSearchParams } from 'react-router-dom';

import { tokenStorage } from '@/auth/token';
import { useEffect } from 'react';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    console.log('callback accessToken:', accessToken);

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
    tokenStorage.setAccessToken(accessToken);

    // 주소창에서 accessToken 제거
    window.history.replaceState({}, '', window.location.pathname);

    navigate('/login', {
      replace: true,
      state: {
        openTermsSheet: true,
      },
    });
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <p className="text-base font-medium">로그인 처리 중...</p>
    </div>
  );
};

export default AuthCallbackPage;
