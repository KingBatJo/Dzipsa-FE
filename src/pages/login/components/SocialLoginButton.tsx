type SocialProvider = 'kakao' | 'naver';

type SocialLoginButtonProps = {
  provider: SocialProvider;
  label: string;
  iconSrc: string;
};

const providerStyles: Record<SocialProvider, string> = {
  kakao: 'bg-[#FEE500] text-black/85',
  naver: 'bg-[#03A94D] text-white',
};

const SocialLoginButton = ({
  provider,
  iconSrc,
  label,
}: SocialLoginButtonProps) => {
  return (
    <button
      type="button"
      className={`flex h-[54px] w-full items-center justify-center gap-[15px] rounded-[6px] ${providerStyles[provider]} hover:brightness-95 active:brightness-90`}
      onClick={() => {
        window.location.href = `/oauth2/authorization/${provider}`;
      }}
    >
      <img
        alt={`${provider} 로고`}
        className="h-4 w-4"
        src={iconSrc}
        onContextMenu={(e) => e.preventDefault()}
      />
      <span className="text-lg font-medium">{label}</span>
    </button>
  );
};

export default SocialLoginButton;
