type SocialProvider = 'kakao' | 'naver';

type SocialLoginButtonProps = {
  provider: SocialProvider;
  label: string;
  iconSrc: string;
  onClick: () => void;
};

const providerStyles: Record<SocialProvider, string> = {
  kakao: 'bg-[#FEE500] text-black/85',
  naver: 'bg-[#03A94D] text-white',
};

const providerIconSizeStyles: Record<SocialProvider, string> = {
  kakao: 'h-[18px] w-[18px]',
  naver: 'h-4 w-4',
};

const SocialLoginButton = ({
  provider,
  iconSrc,
  label,
  onClick,
}: SocialLoginButtonProps) => {
  return (
    <button
      type="button"
      className={`flex h-[54px] w-full min-w-[330px] items-center justify-center gap-[15px] rounded-[10px] ${providerStyles[provider]} hover:brightness-95 active:brightness-90`}
      onClick={onClick}
    >
      <img
        alt={`${provider} logo`}
        className={providerIconSizeStyles[provider]}
        src={iconSrc}
        onContextMenu={(e) => e.preventDefault()}
      />
      <span className="text-lg font-medium">{label}</span>
    </button>
  );
};

export default SocialLoginButton;
