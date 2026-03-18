// 루트 경로("/") 접근 시 인증/온보딩 상태에 따라 초기 진입 페이지로 분기

import { hasAgreedToTerms, hasRoom } from '@/api/auth/auth.utils';

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { useMeQuery } from '@/api/auth/auth.query';

const RootRedirect = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);
  const {
    data: me,
    isLoading,
    isError,
  } = useMeQuery({
    enabled: !!accessToken && isAuthChecked,
  });

  // AuthInitializer에서 인증 확인이 끝나기 전까지는 분기하지 않음
  if (!isAuthChecked) return null;

  // accessToken이 없으면 로그인 페이지로 이동
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // accessToken은 있지만 me 조회가 아직 끝나지 않았으면 대기
  if (isLoading) return null;

  // me 조회 실패 시 로그인 페이지로 이동
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  // 예외적으로 me가 아직 없으면 분기 보류
  if (!me) return null;

  // 약관 미동의 사용자는 약관 동의 페이지로 이동
  if (!hasAgreedToTerms(me)) {
    return <Navigate to="/signup/terms" replace />;
  }

  // 방 미소속 사용자는 온보딩으로 이동
  if (!hasRoom(me)) {
    return <Navigate to="/onboarding" replace />;
  }

  // 인증 및 초기 조건을 모두 만족하면 홈으로 이동
  return <Navigate to="/home" replace />;
};

export default RootRedirect;
