// 약관 동의와 온보딩을 완료한 사용자만
// 메인 앱 영역(/home 등)에 접근할 수 있도록 제한

import { Navigate, Outlet } from 'react-router-dom';
import { hasAgreedToTerms, isOnboardingCompleted } from '@/api/auth/auth.utils';

import { useAuthStore } from '@/stores/auth.store';

const AppEntryRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (!hasAgreedToTerms(user)) {
    return <Navigate to="/signup/terms" replace />;
  }

  if (!isOnboardingCompleted(user)) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default AppEntryRoute;
