import type { MeResponse } from '@/api/auth/auth.types';

export const hasAgreedToTerms = (user: MeResponse | null) => {
  if (!user) return false;

  return user.termsAgreed;
};

export const hasRoom = (user: MeResponse | null) => {
  if (!user) return false;

  return user.hasRoom;
};
