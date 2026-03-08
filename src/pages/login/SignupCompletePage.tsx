import { Button } from '@/components/ui/button';
import DzipsaCharacter from '@/components/common/DzipsaCharacter';

const SignupCompletePage = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center">
        <DzipsaCharacter />

        <h1 className="pt-15 text-center text-xl font-semibold">
          환영합니다!
          <br />
          가입이 완료되었어요!
        </h1>

        <p className="pt-2 text-center text-sm font-semibold text-[#BCBCBC]">
          디집사와 함께 눈치 보지 않는 편안한
          <br /> 공동생활을 시작해 보세요.
        </p>
      </div>

      <Button className="mx-4 mb-18 h-12">시작하기</Button>
    </div>
  );
};

export default SignupCompletePage;
