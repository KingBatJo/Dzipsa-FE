import { getInvitationCode, reissueInvitationCode } from '@/api/room/room.api';
import { useEffect, useState } from 'react';

import BackHeader from '@/components/layout/BackHeader';
import { Button } from '@/components/ui/button';
import InviteCodeCard from '@/components/common/InviteCodeCard';
import { getApiErrorMessage } from '@/api/error';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const RoomInvitationPage = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInvitationCode = async () => {
      try {
        setIsLoading(true);

        const { invitationCode } = await getInvitationCode();
        setInviteCode(invitationCode);
      } catch (error) {
        const message = getApiErrorMessage(error);

        console.error('초대 코드 조회 실패: ', message, error);
        toast(message, {
          id: 'invitation-code-error',
          duration: 2000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitationCode();
  }, []);

  const handleReissue = async () => {
    try {
      setIsLoading(true);

      const { invitationCode } = await reissueInvitationCode();
      setInviteCode(invitationCode);

      toast('초대 코드가 재발급되었어요', {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <BackHeader onBack={() => navigate(-1)} title="내 방 초대" />

      <div className="flex flex-col items-center gap-10 px-9 pt-15">
        <div className="flex flex-col items-center gap-3">
          <p className="text-muted-foreground text-base font-semibold">
            우리집 초대코드
          </p>

          {inviteCode ? (
            <InviteCodeCard inviteCode={inviteCode} />
          ) : (
            // 임시
            <p>초대 코드 없음</p>
          )}
        </div>

        <Button
          onClick={handleReissue}
          disabled={isLoading || !inviteCode}
          className="bg-muted-foreground rounded-lg"
        >
          코드 재발급 하기
        </Button>
      </div>
    </div>
  );
};

export default RoomInvitationPage;
