import { Navigate, Outlet } from 'react-router-dom';
import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';

import { useAuthStore } from '@/stores/auth.store';

const OnboardingRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (!hasAgreedToTerms(user)) {
    return <Navigate to="/signup/terms" replace />;
  }

  if (hasRoom(user)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default OnboardingRoute;
