export type SocialProvider = 'kakao' | 'naver';

export type RefreshResponse = {
  accessToken: string;
};

export type MeResponse = {
  id: number;
  email: string;
  nickname: string;
  providerType: 'KAKAO' | 'NAVER';
  profileImageUrl: string;
  role: 'USER' | 'ADMIN';
  // 추후 약관 동의 여부, 룸 소속 여부 추가 예정
};

export type AuthErrorCode =
  | 'SERVER_ERROR'
  | 'MISSING_COOKIE'
  | 'INVALID_REFRESH_TOKEN'
  | 'USER_NOT_FOUND'
  | 'MISSING_HEADER'
  | 'INVALID_TOKEN';
