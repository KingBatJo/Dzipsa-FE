import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BASE_URL } from '@/api/client';
import DzipsaCharacter from '@/components/common/DzipsaCharacter';
import SocialLoginButton from '@/pages/login/components/SocialLoginButton';
import type { SocialProvider } from '@/api/auth/auth.types';
import TermsAgreementSheet from '@/pages/login/components/TermsAgreementSheet';
import kakaoSymbol from '@/assets/kakao_symbol.svg';
import naverSymbol from '@/assets/naver_symbol.svg';
import { toast } from 'sonner';

export type LoginNavigationState = {
  openTermsSheet?: boolean;
  loginError?: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleSocialLogin = (provider: SocialProvider) => {
    window.location.href = `${BASE_URL}/oauth2/authorization/${provider}`;
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

  useEffect(() => {
    if (!loginErrorMessage) return;

    toast(loginErrorMessage, {
      id: 'login-error',
      duration: 2000,
    });
  }, [loginErrorMessage]);

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
        onClick={() => handleSocialLogin('kakao')}
      />

      <SocialLoginButton
        provider="naver"
        iconSrc={naverSymbol}
        label="네이버로 시작하기"
        onClick={() => handleSocialLogin('naver')}
      />

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
