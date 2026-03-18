import type { MeResponse } from '@/api/auth/auth.types';
import { useAuthStore } from '@/stores/auth.store';
import { useMeQuery } from '@/api/auth/auth.query';

type UseAuthGuardMeResult = {
  me: MeResponse | null;
  isChecking: boolean; // 인증/사용자 조회 진행 중 여부
  shouldRedirectToLogin: boolean; // 로그인으로 보내야 하는지 여부
};

/**
 * 인증 라우트 가드에서 공통으로 사용하는 훅
 * - accessToken + 인증 확인 완료 후 me 조회
 * - 토큰 없음 / 쿼리 에러 / me 없음 → 로그인 리다이렉트 대상
 */
export const useAuthGuardMe = (): UseAuthGuardMeResult => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  const {
    data: me,
    isLoading,
    isError,
  } = useMeQuery({
    enabled: !!accessToken && isAuthChecked,
  });

  const isChecking = !isAuthChecked || (!!accessToken && isLoading);
  const shouldRedirectToLogin =
    isAuthChecked && (!accessToken || isError || (!isLoading && !me));

  return { me: me ?? null, isChecking, shouldRedirectToLogin };
};
