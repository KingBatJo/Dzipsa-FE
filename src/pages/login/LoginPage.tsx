import { useEffect, useState } from 'react';

import { BASE_URL } from '@/api/client';
import DzipsaCharacter from '@/components/common/DzipsaCharacter';
import SocialLoginButton from '@/pages/login/components/SocialLoginButton';
import type { SocialProvider } from '@/api/auth/auth.types';
import kakaoSymbol from '@/assets/kakao_symbol.svg';
import naverSymbol from '@/assets/naver_symbol.svg';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

export type LoginNavigationState = {
  loginError?: string;
};

const LoginPage = () => {
  const location = useLocation();

  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleSocialLogin = (provider: SocialProvider) => {
    window.location.href = `${BASE_URL}/oauth2/authorization/${provider}`;
  };

  useEffect(() => {
    const state = location.state as LoginNavigationState | null;

    if (!state) return;

    if (state.loginError) {
      setLoginErrorMessage(state.loginError);
    }
  }, [location.state]);

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
    </div>
  );
};

export default LoginPage;
