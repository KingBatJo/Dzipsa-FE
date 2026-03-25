import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLogoutMutation, useMeQuery } from '@/api/auth/auth.query';

import { HEADER_HEIGHT_CLASS } from '@/constants/layout';
import edit from '@/assets/icon/edit.svg';
import { getProfileOptionById } from '@/api/room/room.utils';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth.store';
import { useLeaveRoomMutation } from '@/api/room/room.query';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';

const MyPage = () => {
  const navigate = useNavigate();

  const { data: me } = useMeQuery();
  const { mutateAsync: logoutMutate } = useLogoutMutation();
  const { mutateAsync: leaveRoomMutate } = useLeaveRoomMutation();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  const profileImage = getProfileOptionById(me?.profileImageUrl).imageUrl;

  const handleLogout = async () => {
    try {
      await logoutMutate();

      resetOnboarding();
      clearAuth();

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('로그아웃 실패: ', error);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      await leaveRoomMutate();

      resetOnboarding();

      toast('방에서 나갔어요.');

      navigate('/onboarding', { replace: true });
    } catch (error) {
      console.error('방 나가기 실패:', error);
      toast('방 나가기에 실패했어요');
    }
  };

  const menuItems = [
    {
      key: 'invite',
      label: '내 방 초대 및 구성원 관리',
      onClick: () => navigate('/mypage/invitation'),
    },
    {
      key: 'leave',
      label: '방 나가기',
      onClick: handleLeaveRoom,
    },
    {
      key: 'logout',
      label: '로그아웃',
      onClick: handleLogout,
    },
    {
      key: 'withdraw',
      label: '회원 탈퇴',
      onClick: () => toast('회원 탈퇴 기능은 준비 중이에요.'),
    },
  ] as const;

  return (
    <div className="min-h-dvh bg-white">
      <header
        className={`flex items-center gap-3 px-[15px] ${HEADER_HEIGHT_CLASS}`}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="flex h-6 w-6 items-center justify-center"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <h1 className="text-lg leading-normal font-semibold text-zinc-900">
          마이페이지
        </h1>
      </header>

      <section className="flex flex-col items-center gap-4 px-4 pt-9 pb-[39px]">
        <div className="flex w-full justify-center">
          <img
            src={profileImage}
            alt="내 프로필 이미지"
            className="h-[140px] w-[140px] rounded-full border border-zinc-200 object-cover"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-[7px]">
            <p className="text-center text-[20px] leading-[1.3] font-semibold text-zinc-900">
              {me?.nickname ?? '-'}
            </p>

            <img src={edit} alt="" className="h-[17px] w-[17px]" />
          </div>

          <p className="text-center text-sm text-zinc-400">
            {me?.email ?? '-'}
          </p>
        </div>
      </section>

      <div className="h-3 w-full bg-zinc-50" />

      <section className="px-[15px] py-[30px]">
        <div className="flex flex-col gap-[30px]">
          {menuItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              className="flex h-[25px] w-full items-center justify-between"
            >
              <span className="text-base leading-normal font-semibold text-zinc-900">
                {item.label}
              </span>
              <ChevronRight className="h-6 w-6 text-zinc-500" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
