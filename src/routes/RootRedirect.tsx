// 루트 경로("/") 접근 시 로그인 여부에 따라 초기 페이지로 분기

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

const RootRedirect = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/home" replace />;
};

export default RootRedirect;
