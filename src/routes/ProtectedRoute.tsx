// 로그인한 사용자만 접근 가능한 라우트 가드
// 비로그인 상태일 경우 /login으로 이동

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth.store';

const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  if (!accessToken)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
};

export default ProtectedRoute;
