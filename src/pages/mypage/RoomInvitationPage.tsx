import BackHeader from '@/components/layout/BackHeader';
import { Button } from '@/components/ui/button';
import InviteCodeCard from '@/components/common/InviteCodeCard';
import { useNavigate } from 'react-router-dom';

const RoomInvitationPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <BackHeader onBack={() => navigate(-1)} title="내 방 초대 " />

      <div className="flex flex-col items-center gap-10 px-9 pt-15">
        <div className="flex flex-col items-center gap-3">
          <p className="text-muted-foreground text-base font-semibold">
            우리집 초대코드
          </p>

          <InviteCodeCard inviteCode={'123456'} />
        </div>

        <Button className="bg-muted-foreground rounded-lg">
          코드 재발급 하기
        </Button>
      </div>
    </div>
  );
};

export default RoomInvitationPage;
