import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';

import { Navigate } from 'react-router-dom';
import { useAuthGuardMe } from '@/hooks/useAuthGuardMe';

// 루트 경로("/") 접근 시 인증/온보딩 상태에 따라 초기 진입 페이지로 분기
const RootRedirect = () => {
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

  return <Navigate to="/home" replace />;
};

export default RootRedirect;
