import type { MeResponse } from '@/api/auth/auth.types';

const MOCK_TERMS_AGREED = true;
const MOCK_ONBOARDING_COMPLETED = false;

export const hasAgreedToTerms = (user: MeResponse | null) => {
  if (!user) return false;

  // 임시 (테스트용)
  return MOCK_TERMS_AGREED;
};

export const isOnboardingCompleted = (user: MeResponse | null) => {
  if (!user) return false;

  // 임시 (테스트용)
  return MOCK_ONBOARDING_COMPLETED;
};
