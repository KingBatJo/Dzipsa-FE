import { getApiErrorInfo, getApiErrorMessage } from '@/api/error';
import { useEffect, useState } from 'react';
import {
  useInvitationCodeQuery,
  useKickRoomMemberMutation,
  useMyRoomQuery,
  useReissueInvitationCodeMutation,
  useRoomMembersQuery,
} from '@/api/room/room.query';

import InviteCodeCard from '@/components/common/InviteCodeCard';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatReissueAvailableTime } from '@/utils/date';
import { getProfileOptionById } from '@/api/room/room.utils';
import { toast } from 'sonner';
import { useMeQuery } from '@/api/auth/auth.query';
import { useNavigate } from 'react-router-dom';

const INVALID_INVITATION_CODE_ERROR = 340001;
const ROOM_NOT_FOUND_ERROR = 340401;

const RoomInvitationPage = () => {
  const navigate = useNavigate();
  const { data: me } = useMeQuery();
  const { data: myRoom } = useMyRoomQuery();
  const [kickingMemberId, setKickingMemberId] = useState<number | null>(null);

  const {
    data: invitationCodeData,
    isLoading: isInvitationCodeLoading,
    isError: isInvitationCodeError,
    error: invitationCodeError,
  } = useInvitationCodeQuery();
  const { data: members = [] } = useRoomMembersQuery({ excludeMe: true });
  const { mutateAsync: reissueMutate, isPending: isReissuing } =
    useReissueInvitationCodeMutation();
  const { mutateAsync: kickMemberMutate } = useKickRoomMemberMutation();

  const invitationErrorCode = getApiErrorInfo(invitationCodeError)?.code;
  const isInvitationExpired =
    invitationErrorCode === INVALID_INVITATION_CODE_ERROR;
  const isRoomNotFound = invitationErrorCode === ROOM_NOT_FOUND_ERROR;

  const inviteCode = invitationCodeData?.invitationCode ?? '';
  const reissueTimeLabel = formatReissueAvailableTime(
    invitationCodeData?.reissueAvailableAt
  );

  const displayCode = inviteCode || '------';
  const isRoomOwner = Boolean(
    me?.id && myRoom?.ownerId && me.id === myRoom.ownerId
  );

  useEffect(() => {
    if (!isInvitationCodeError) return;
    if (isInvitationExpired || isRoomNotFound) return;

    const message = getApiErrorMessage(invitationCodeError);

    console.error('초대 코드 조회 실패: ', message, invitationCodeError);
    toast(message, {
      id: 'invitation-code-error',
      duration: 2000,
    });
  }, [
    invitationCodeError,
    isInvitationCodeError,
    isInvitationExpired,
    isRoomNotFound,
  ]);

  const handleReissue = async () => {
    try {
      await reissueMutate();

      toast('초대 코드가 재발급되었어요.', {
        id: 'reissue-invitation-code-success',
        duration: 2000,
      });
    } catch (error) {
      const message = getApiErrorMessage(error);

      console.error('초대 코드 재발급 실패: ', message, error);
      toast(message, {
        id: 'reissue-invitation-code-error',
        duration: 2000,
      });
    }
  };

  const handleKickMember = async (memberUserId: number, nickname: string) => {
    setKickingMemberId(memberUserId);

    try {
      await kickMemberMutate(memberUserId);

      toast(`${nickname}님을 내보냈어요.`, {
        id: 'kick-member-success',
        duration: 2000,
      });
    } catch (error) {
      const message = getApiErrorMessage(error);

      console.error('구성원 내보내기 실패: ', message, error);
      toast(message, {
        id: 'kick-member-error',
        duration: 2000,
      });
    } finally {
      setKickingMemberId(null);
    }
  };

  const isReissueButtonEnabled = isInvitationExpired;

  return (
    <div className="min-h-dvh bg-white">
      <header className="flex items-center justify-between p-[15px]">
        <div className="h-6 w-6" />
        <h1 className="text-center text-lg leading-normal font-semibold text-zinc-900">
          내 방 초대 및 구성원 관리
        </h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="닫기"
          className="flex h-6 w-6 items-center justify-center"
        >
          <X className="h-6 w-6 text-zinc-900" />
        </button>
      </header>

      <section className="px-[15px] pt-[35px] pb-3">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex w-full flex-col items-center gap-1">
              <p className="w-full text-center text-base leading-normal font-semibold text-zinc-700">
                우리집 초대코드
              </p>
              <p className="w-full text-center text-xs leading-normal font-medium text-zinc-500">
                발급받은 코드는 24시간동안 유효합니다
              </p>
            </div>

            <InviteCodeCard
              inviteCode={displayCode}
              isDimmed={isInvitationExpired || !inviteCode}
              disableCopy={!inviteCode || isInvitationExpired}
              className="w-fit"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleReissue}
              disabled={
                isInvitationCodeLoading ||
                isReissuing ||
                !isReissueButtonEnabled ||
                isRoomNotFound
              }
              className={cn(
                'h-9 w-[130px] rounded-[10px] px-4 py-2 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
                isReissueButtonEnabled ? 'bg-zinc-900' : 'bg-zinc-300'
              )}
            >
              코드 재발급 하기
            </button>

            {isInvitationExpired ? (
              <p className="text-center text-xs leading-normal font-medium whitespace-pre-wrap text-red-500">
                {'보안을 위해 코드가 만료되었습니다.\n다시 발급하시겠어요?'}
              </p>
            ) : (
              <p className="text-center text-xs leading-normal font-medium text-zinc-400">
                재발급은 {reissueTimeLabel}분에 다시 시도해주세요
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="h-3 w-full bg-zinc-50" />

      <section className="px-[15px] py-[30px]">
        <div className="flex flex-col gap-5">
          <p className="text-sm leading-[1.3] font-semibold text-zinc-400">
            우리집 구성원
          </p>

          <div className="flex flex-col gap-5">
            {members.map((member) => {
              const profile = getProfileOptionById(member.profileImageUrl);
              const isKicking = kickingMemberId === member.id;

              return (
                <div
                  key={member.id}
                  className="flex h-8 items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={profile.imageUrl}
                      alt={`${member.nickname} 프로필`}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <p className="text-base leading-normal font-semibold text-zinc-900">
                      {member.nickname}
                    </p>
                  </div>

                  {isRoomOwner && (
                    <button
                      type="button"
                      onClick={() =>
                        handleKickMember(member.id, member.nickname)
                      }
                      disabled={isKicking}
                      className="flex h-[26px] items-center rounded-[10px] bg-zinc-500 px-[10px] py-[6px] text-xs leading-normal font-semibold text-zinc-100 disabled:opacity-50"
                    >
                      {isKicking ? '처리 중' : '내보내기'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomInvitationPage;
