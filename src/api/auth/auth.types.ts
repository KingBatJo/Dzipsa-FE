export type SocialProvider = 'kakao' | 'naver';

export type RefreshResponse = {
  accessToken: string;
};

export type AuthErrorCode =
  | 'SERVER_ERROR'
  | 'MISSING_COOKIE'
  | 'INVALID_REFRESH_TOKEN'
  | 'USER_NOT_FOUND'
  | 'MISSING_HEADER'
  | 'INVALID_TOKEN';
