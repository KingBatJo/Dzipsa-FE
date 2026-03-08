import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { provider } = useParams();
  const [searchParams] = useSearchParams();

  const mock = searchParams.get('mock');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mock === 'success') {
        navigate('/login', {
          replace: true,
          state: {
            openTermsSheet: true,
          },
        });
        return;
      }

      if (mock === 'error') {
        navigate('/login', {
          replace: true,
          state: {
            loginError: `${provider} 로그인에 실패했어요. 다시 시도해주세요.`,
          },
        });

        return;
      }

      navigate('/login', {
        replace: true,
        state: {
          loginError: '로그인 처리 중 문제가 발생했어요. 다시 시도해주세요.',
        },
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [mock, navigate, provider]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <p className="text-base font-medium">로그인 처리 중...</p>
    </div>
  );
};

export default AuthCallbackPage;
