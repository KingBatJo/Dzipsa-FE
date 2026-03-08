import SocialLoginButton from '@/pages/login/components/SocialLoginButton';
import kakaoSymbol from '@/assets/kakao_symbol.svg';
import naverSymbol from '@/assets/naver_symbol.svg';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4">
      <div className="flex flex-col items-center gap-4 pb-40">
        {/* 디집사 캐릭터 */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-300 text-3xl font-extralight">
          O O
        </div>
        <p className="text-lg font-semibold">디집사</p>
      </div>

      <SocialLoginButton
        provider="kakao"
        iconSrc={kakaoSymbol}
        label="카카오로 시작하기"
      />

      <SocialLoginButton
        provider="naver"
        iconSrc={naverSymbol}
        label="네이버로 시작하기"
      />
    </div>
  );
};

export default LoginPage;
