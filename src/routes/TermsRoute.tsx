import { Navigate, Outlet } from 'react-router-dom';
import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';

import { useAuthStore } from '@/stores/auth.store';
import { useMeQuery } from '@/api/auth/auth.query';

const TermsRoute = () => {
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

  if (hasAgreedToTerms(me)) {
    if (hasRoom(me)) {
      return <Navigate to="/home" replace />;
    }

    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default TermsRoute;
