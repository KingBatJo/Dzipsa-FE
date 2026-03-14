import { Button } from '@/components/ui/button';
import { HEADER_HEIGHT_CLASS } from '@/constants/layout';
import { X } from 'lucide-react';
import { logout } from '@/api/auth/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    try {
      await logout();

      clearAuth();

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('로그아웃 실패: ', error);
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

      <section className="flex flex-col items-center py-4">
        <Button
          type="button"
          variant="destructive"
          onClick={handleLogout}
          className="text-white"
        >
          로그아웃
        </Button>
      </section>
    </div>
  );
};

export default MyPage;
