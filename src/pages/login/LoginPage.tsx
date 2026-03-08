import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DzipsaCharacter from '@/components/common/DzipsaCharacter';
import SocialLoginButton from '@/pages/login/components/SocialLoginButton';
import TermsAgreementSheet from '@/pages/login/components/TermsAgreementSheet';
import kakaoSymbol from '@/assets/kakao_symbol.svg';
import naverSymbol from '@/assets/naver_symbol.svg';

export type SocialProvider = 'kakao' | 'naver';

type LoginNavigationState = {
  openTermsSheet?: boolean;
  loginError?: string;
};

export const MOCK_LOGIN_RESULT: 'success' | 'error' = 'success';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleSocialLogin = (provider: SocialProvider) => {
    navigate(`/auth/callback/${provider}?mock=${MOCK_LOGIN_RESULT}`);

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
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4">
      <div className="flex flex-col items-center gap-4 pb-40">
        <DzipsaCharacter />
        <p className="text-lg font-semibold">디집사</p>
      </div>

      <SocialLoginButton
        provider="kakao"
        iconSrc={kakaoSymbol}
        label="카카오로 시작하기"
        onClick={() => handleSocialLogin('kakao')}
      />

      <SocialLoginButton
        provider="naver"
        iconSrc={naverSymbol}
        label="네이버로 시작하기"
        onClick={() => handleSocialLogin('naver')}
      />

      {loginErrorMessage && (
        <p className="text-sm text-red-500">{loginErrorMessage}</p>
      )}

      {/* 이용약관 동의 */}
      <TermsAgreementSheet
        open={isTermsOpen}
        onOpenChange={setIsTermsOpen}
        onAgree={() => navigate('/signup/complete')}
      />
    </div>
  );
};

export default LoginPage;
