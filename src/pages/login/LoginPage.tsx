import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DzipsaCharacter from '@/components/common/DzipsaCharacter';
import SocialLoginButton from '@/pages/login/components/SocialLoginButton';
import TermsAgreementSheet from '@/pages/login/components/TermsAgreementSheet';
import kakaoSymbol from '@/assets/kakao_symbol.svg';
import naverSymbol from '@/assets/naver_symbol.svg';

export type LoginNavigationState = {
  openTermsSheet?: boolean;
  loginError?: string;
};

const MOCK_LOGIN_RESULT = 'error' as 'success' | 'error';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleSocialLogin = () => {
    if (MOCK_LOGIN_RESULT === 'success') {
      navigate('/auth/callback?accessToken=mock-access-token', {
        replace: true,
      });
      return;
    }

    navigate('/auth/callback', {
      replace: true,
    });

    // window.location.href = `/oauth2/authorization/${provider}`;
  };

  useEffect(() => {
    const state = location.state as LoginNavigationState | null;

    if (!state) return;

    if (state.openTermsSheet) {
      setIsTermsOpen(true);
      setLoginErrorMessage('');
    } else if (state.loginError) {
      setLoginErrorMessage(state.loginError);
      setIsTermsOpen(false);
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 px-4">
      <div className="flex flex-col items-center gap-4 pb-40">
        <DzipsaCharacter />
        <p className="text-lg font-semibold">디집사</p>
      </div>

      <SocialLoginButton
        provider="kakao"
        iconSrc={kakaoSymbol}
        label="카카오로 시작하기"
        onClick={handleSocialLogin}
      />

      <SocialLoginButton
        provider="naver"
        iconSrc={naverSymbol}
        label="네이버로 시작하기"
        onClick={handleSocialLogin}
      />

      {loginErrorMessage && (
        <p className="text-sm text-red-500">{loginErrorMessage}</p>
      )}

      {/* 이용약관 동의 */}
      <TermsAgreementSheet
        open={isTermsOpen}
        onOpenChange={setIsTermsOpen}
        onAgree={() => navigate('/signup/complete', { replace: true })}
      />
    </div>
  );
};

export default LoginPage;
