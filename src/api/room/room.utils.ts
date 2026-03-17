import { PROFILE_OPTIONS } from '@/constants/onboarding';

export const getProfileOptionById = (profileId?: string | null) => {
  return (
    PROFILE_OPTIONS.find((profile) => profile.id === profileId) ??
    PROFILE_OPTIONS[0]
  );
};
