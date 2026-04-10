import { Navigate, Outlet } from 'react-router-dom';
import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';

import { useAuthGuardMe } from '@/hooks/useAuthGuardMe';

// 약관 페이지 가드: 약관 완료 사용자는 terms 접근 대신 다음 단계로 보냄
const TermsRoute = () => {
  const { me, isChecking, shouldRedirectToLogin } = useAuthGuardMe();

  if (isChecking) return null;

  // 인증 정보가 유효하지 않으면 로그인으로 이동
  if (shouldRedirectToLogin || !me) {
    return <Navigate to="/login" replace />;
  }

  if (hasAgreedToTerms(me)) {
    if (hasRoom(me)) {
      return <Navigate to="/home" replace />;
    }

    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default TermsRoute;
