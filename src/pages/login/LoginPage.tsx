import { useEffect, useState } from 'react';

import { BASE_URL } from '@/api/client';
import SocialLoginButton from '@/pages/login/components/SocialLoginButton';
import type { SocialProvider } from '@/api/auth/auth.types';
import dzipsaLogo from '@/assets/logo/dzipsa-logo.png';
import kakaoSymbol from '@/assets/kakao_symbol.svg';
import login from '@/assets/image/login/login.png';
import loginStartText from '@/assets/image/login/login-start-text.png';
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
    <div className="relative flex min-h-dvh flex-col items-center justify-center gap-3">
      <img src={login} alt="" className="absolute top-[5%] w-full" />

      <div className="flex w-full flex-col items-start gap-2 pt-[10%] pl-[15%]">
        <h1 className="text-xl font-bold text-[#ACACAC]">
          우리집만의
          <br />
          디지털 집사
        </h1>

        <img src={dzipsaLogo} alt="디집사 로고" />
      </div>

      <div className="flex w-full flex-col pt-[230px]">
        <div className="flex items-center justify-center">
          <img src={loginStartText} alt="" className="h-[35px] w-[39px]" />
          <p className="text-sm font-semibold text-[#BCBCBC]">
            지금 가입하고 평화로운 공동생활 시작하기
          </p>
        </div>

        <div className="flex justify-center px-[15%] py-[5px]">
          <SocialLoginButton
            provider="kakao"
            iconSrc={kakaoSymbol}
            label="카카오로 시작하기"
            onClick={() => handleSocialLogin('kakao')}
          />
        </div>
        <div className="flex justify-center px-[15%] py-[5px]">
          <SocialLoginButton
            provider="naver"
            iconSrc={naverSymbol}
            label="네이버로 시작하기"
            onClick={() => handleSocialLogin('naver')}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
