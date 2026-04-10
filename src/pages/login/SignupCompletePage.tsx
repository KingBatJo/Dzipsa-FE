import AppButton from '@/components/common/AppButton';
import celebration from '@/assets/image/login/celebration.png';
import { useNavigate } from 'react-router-dom';

const SignupCompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-[21px] pt-[15%]">
        <img src={celebration} alt="" className="h-[244px] w-[160px]" />

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-center text-xl font-semibold">
            환영합니다!
            <br />
            가입이 완료되었어요!
          </h1>

          <p className="text-center text-sm font-semibold text-zinc-400">
            디집사와 함께 눈치 보지 않는 편안한
            <br /> 공동생활을 시작해 보세요.
          </p>
        </div>
      </div>

      <div className="px-[15px] pt-[10px] pb-[50px]">
        <AppButton
          onClick={() => navigate('/onboarding', { replace: true })}
          className="bg-zinc-800 text-zinc-100 hover:bg-zinc-900"
        >
          시작하기
        </AppButton>
      </div>
    </div>
  );
};

export default SignupCompletePage;
