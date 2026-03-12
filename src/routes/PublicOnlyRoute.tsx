// 비로그인 사용자 전용 라우트 가드
// 로그인 상태이면 /home으로 이동

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth.store';

const PublicOnlyRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) return <Navigate to="/home" replace />;

  return <Outlet />;
};

export default PublicOnlyRoute;
