import { Navigate, Outlet } from 'react-router-dom';
import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';

import { useAuthGuardMe } from '@/hooks/useAuthGuardMe';

// 앱 메인 영역 가드: 약관 동의 + 방 소속 사용자만 접근 허용
const AppEntryRoute = () => {
  const { me, isChecking, shouldRedirectToLogin } = useAuthGuardMe();

  if (isChecking) return null;

  // 인증 정보가 유효하지 않으면 로그인으로 이동
  if (shouldRedirectToLogin || !me) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAgreedToTerms(me)) {
    return <Navigate to="/signup/terms" replace />;
  }

  if (!hasRoom(me)) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default AppEntryRoute;
