import SocialLoginButton from '@/pages/login/components/SocialLoginButton';
import kakaoSymbol from '@/assets/kakao_symbol.svg';
import naverSymbol from '@/assets/naver_symbol.svg';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4">
      <SocialLoginButton
        provider="kakao"
        iconSrc={kakaoSymbol}
        label="카카오 로그인"
      />

      <SocialLoginButton
        provider="naver"
        iconSrc={naverSymbol}
        label="네이버 로그인"
      />
    </div>
  );
};

export default LoginPage;
