// 약관에 동의하고 방에 소속된 사용자만
// 메인 앱 영역(/home 등)에 접근할 수 있도록 제한

import { Navigate, Outlet } from 'react-router-dom';
import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';

import { useAuthStore } from '@/stores/auth.store';
import { useMeQuery } from '@/api/auth/auth.query';

const AppEntryRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);
  const {
    data: me,
    isLoading,
    isError,
  } = useMeQuery({
    enabled: !!accessToken && isAuthChecked,
  });

  if (!isAuthChecked) return null;

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) return null;

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (!me) {
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
