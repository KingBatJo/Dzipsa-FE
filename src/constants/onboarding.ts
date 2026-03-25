import Profile1 from '@/assets/image/profile/profile-1.png';
import Profile2 from '@/assets/image/profile/profile-2.png';
import Profile3 from '@/assets/image/profile/profile-3.png';
import Profile4 from '@/assets/image/profile/profile-4.png';
import Profile5 from '@/assets/image/profile/profile-5.png';
import Profile6 from '@/assets/image/profile/profile-6.png';

export const MOTTO_TEMPLATES = [
  '미루지 말고 지금 하자',
  '눈치보지 말고 말하자',
  '먹은 자가 치우자',
  '남이지만 존중 필수',
  '내 건 내가 사자',
] as const;

export const PROFILE_OPTIONS = [
  { id: '1', imageUrl: Profile1, alt: '기본 프로필 1' },
  { id: '2', imageUrl: Profile2, alt: '기본 프로필 2' },
  { id: '3', imageUrl: Profile3, alt: '기본 프로필 3' },
  { id: '4', imageUrl: Profile4, alt: '기본 프로필 4' },
  { id: '5', imageUrl: Profile5, alt: '기본 프로필 5' },
  { id: '6', imageUrl: Profile6, alt: '기본 프로필 6' },
] as const;

export const APP_URL = import.meta.env.VITE_APP_URL;

export const MOTTO_MAX_LENGTH = 20;
export const NICKNAME_MAX_LENGTH = 20;

export const OTP_LENGTH = 6;
