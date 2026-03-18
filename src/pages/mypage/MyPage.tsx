import { Button } from '@/components/ui/button';
import { HEADER_HEIGHT_CLASS } from '@/constants/layout';
import { X } from 'lucide-react';
import { leaveRoom } from '@/api/room/room.api';
import { logout } from '@/api/auth/auth.api';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';

const MyPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  const handleLogout = async () => {
    try {
      await logout();

      resetOnboarding();
      clearAuth();

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('로그아웃 실패: ', error);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      await leaveRoom();

      resetOnboarding();
      updateUser({ hasRoom: false });

      toast('방에서 나갔어요.');

      navigate('/onboarding', { replace: true });
    } catch (error) {
      console.error('방 나가기 실패:', error);
      toast('방 나가기에 실패했어요.');
    }
  };

  return (
    <div className="min-h-dvh">
      <header
        className={`flex items-center justify-between px-4 ${HEADER_HEIGHT_CLASS} `}
      >
        <p className="text-xl font-semibold">마이페이지</p>

        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate(-1)}
          aria-label="닫기"
          className="flex h-8 w-8"
        >
          <X className="h-5 w-5" />
        </Button>
      </header>

      <section className="flex flex-col items-center py-4">
        프로필
        <p className="text-lg font-semibold">{user?.nickname ?? '-'}</p>
        <p className="text-sm text-neutral-500">{user?.email ?? '-'}</p>
      </section>

      <div className="bg-secondary h-[13px]" />

      <section className="flex flex-col items-center gap-2 py-4">
        <Button type="button" onClick={() => navigate('/mypage/invitation')}>
          내 방 초대
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={handleLogout}
          className="text-white"
        >
          로그아웃
        </Button>

        <Button type="button" variant="outline" onClick={handleLeaveRoom}>
          방 나가기
        </Button>
      </section>
    </div>
  );
};

export default MyPage;
