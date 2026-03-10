import Profile from '@/assets/profile.svg';

export const MOTTO_TEMPLATES = [
  '미루지 말고 지금 하자',
  '눈치보지 말고 말하자',
  '먹은 자가 치우자',
  '남이지만 존중 필수',
  '내 건 내가 사자',
] as const;

export const PROFILE_OPTIONS = [
  { id: 0, imageUrl: Profile, alt: '기본 프로필 1' },
  { id: 1, imageUrl: Profile, alt: '기본 프로필 2' },
  { id: 2, imageUrl: Profile, alt: '기본 프로필 3' },
  { id: 3, imageUrl: Profile, alt: '기본 프로필 4' },
  { id: 4, imageUrl: Profile, alt: '기본 프로필 5' },
  { id: 5, imageUrl: Profile, alt: '기본 프로필 6' },
] as const;

export const APP_URL = import.meta.env.VITE_APP_URL;

export const MOTTO_MAX_LENGTH = 20;
export const NICKNAME_MAX_LENGTH = 20;

export const OTP_LENGTH = 6;
