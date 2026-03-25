import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useDeleteMeMutation,
  useLogoutMutation,
  useMeQuery,
} from '@/api/auth/auth.query';

import { HEADER_HEIGHT_CLASS } from '@/constants/layout';
import MyPageActionDialog from '@/pages/mypage/components/MyPageActionDialog';
import editIcon from '@/assets/icon/edit.svg';
import { getProfileOptionById } from '@/api/room/room.utils';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth.store';
import { useLeaveRoomMutation } from '@/api/room/room.query';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { useState } from 'react';

type ActionType = 'leave-room' | 'logout' | 'withdraw';

const MyPage = () => {
  const navigate = useNavigate();

  const { data: me } = useMeQuery();
  const { mutateAsync: logoutMutate, isPending: isLoggingOut } =
    useLogoutMutation();
  const { mutateAsync: leaveRoomMutate, isPending: isLeavingRoom } =
    useLeaveRoomMutation();
  const { mutateAsync: deleteMeMutate, isPending: isDeletingAccount } =
    useDeleteMeMutation();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);
  const [activeDialog, setActiveDialog] = useState<ActionType | null>(null);

  const profileImage = getProfileOptionById(me?.profileImageUrl).imageUrl;

  const handleLogout = async () => {
    try {
      await logoutMutate();

      resetOnboarding();
      clearAuth();

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('로그아웃 실패: ', error);
      toast('로그아웃에 실패했어요');
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

  const handleWithdraw = async () => {
    try {
      await deleteMeMutate();

      resetOnboarding();
      clearAuth();
      toast('회원 탈퇴가 완료되었어요.');

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      toast('회원 탈퇴에 실패했어요');
    }
  };

  const menuItems = [
    {
      key: 'invite',
      label: '내 방 초대 및 구성원 관리',
      onClick: () => navigate('/mypage/invitation'),
      disabled: false,
    },
    {
      key: 'leave-room',
      label: '방 나가기',
      onClick: () => setActiveDialog('leave-room'),
      disabled: false,
    },
    {
      key: 'logout',
      label: '로그아웃',
      onClick: () => setActiveDialog('logout'),
      disabled: false,
    },
    {
      key: 'withdraw',
      label: '회원 탈퇴',
      onClick: () => {},
      disabled: true,
    },
  ] as const;

  return (
    <>
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

              <img src={editIcon} alt="" className="h-[17px] w-[17px]" />
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
                disabled={item.disabled}
                className="group flex h-[25px] w-full items-center justify-between disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="text-base leading-normal font-semibold text-zinc-900 group-hover:underline">
                  {item.label}
                </span>
                <ChevronRight className="h-6 w-6 text-zinc-500" />
              </button>
            ))}
          </div>
        </section>
      </div>

      <MyPageActionDialog
        open={activeDialog === 'leave-room'}
        onOpenChange={(open) => setActiveDialog(open ? 'leave-room' : null)}
        title="정말 방을 나가시겠어요?"
        description={
          <>
            방을 나가면 이 집의 일정과 규칙 알림을
            <br />더 이상 받을 수 없어요.
          </>
        }
        confirmText="방 나가기"
        isConfirming={isLeavingRoom}
        onConfirm={handleLeaveRoom}
      />

      <MyPageActionDialog
        open={activeDialog === 'logout'}
        onOpenChange={(open) => setActiveDialog(open ? 'logout' : null)}
        title="잠시 자리를 비우시나요?"
        description={
          <>
            로그아웃 후 다시 로그인하면
            <br />집 소식을 확인할 수 있어요.
          </>
        }
        confirmText="로그아웃"
        isConfirming={isLoggingOut}
        onConfirm={handleLogout}
      />

      <MyPageActionDialog
        open={activeDialog === 'withdraw'}
        onOpenChange={(open) => setActiveDialog(open ? 'withdraw' : null)}
        title="디집사를 떠나시겠어요?"
        description={
          <>
            탈퇴하면 계정 정보와 집 기록이
            <br />
            모두 삭제되며 복구할 수 없습니다.
          </>
        }
        confirmText="계정 탈퇴"
        isConfirming={isDeletingAccount}
        onConfirm={handleWithdraw}
      />
    </>
  );
};

export default MyPage;
