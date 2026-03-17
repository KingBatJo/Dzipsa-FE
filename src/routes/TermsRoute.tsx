import { Navigate, Outlet } from 'react-router-dom';
import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';

import { useAuthStore } from '@/stores/auth.store';

const TermsRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (hasAgreedToTerms(user)) {
    if (hasRoom(user)) {
      return <Navigate to="/home" replace />;
    }

    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default TermsRoute;
