// 루트 경로("/") 접근 시 로그인 여부에 따라 초기 페이지로 분기

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

const RootRedirect = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  if (!isAuthChecked) return null;

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/home" replace />;
};

export default RootRedirect;
