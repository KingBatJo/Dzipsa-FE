import { Navigate, Outlet } from 'react-router-dom';
import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';

import { useAuthGuardMe } from '@/hooks/useAuthGuardMe';

// 온보딩 가드: 약관 미동의/이미 방 보유 사용자의 접근을 제어
const OnboardingRoute = () => {
  const { me, isChecking, shouldRedirectToLogin } = useAuthGuardMe();

  if (isChecking) return null;

  // 인증 정보가 유효하지 않으면 로그인으로 이동
  if (shouldRedirectToLogin || !me) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAgreedToTerms(me)) {
    return <Navigate to="/signup/terms" replace />;
  }

  if (hasRoom(me)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default OnboardingRoute;
