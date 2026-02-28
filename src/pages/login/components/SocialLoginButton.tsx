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
      className={`flex h-12 w-full max-w-92 items-center justify-center gap-2 rounded-xl ${providerStyles[provider]} hover:brightness-95 active:brightness-90`}
      onClick={() => {
        window.location.href = `/oauth2/authorization/${provider}`;
      }}
    >
      <img
        alt={`${provider} 로고`}
        className="h-4 w-4"
        src={iconSrc}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
      <span className="text-base font-medium">{label}</span>
    </button>
  );
};

export default SocialLoginButton;
