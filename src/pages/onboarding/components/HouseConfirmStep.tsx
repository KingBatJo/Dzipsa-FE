import Profile from '@/assets/profile.svg';
import type { RoomMemberResponse } from '@/api/room/room.types';
import UserProfile from '@/components/common/UserProfile';
import dzipsaCharacter from '@/assets/dzipsa.svg';

type HouseConfirmStepProps = {
  members: RoomMemberResponse[];
};

const HouseConfirmStep = ({ members }: HouseConfirmStepProps) => {
  return (
    <div className="flex flex-col items-center pt-30">
      <section className="pb-6 text-center text-lg leading-6 font-semibold">
        <p>기다리고 있었습니다!</p>
        <p>외출하신 사이에 깨끗하게 치워뒀어요</p>
        <p>입장하시려는 집이 맞나요?</p>
      </section>

      <img src={dzipsaCharacter} alt="디집사 캐릭터" className="h-[172px]" />

      <section className="flex flex-col gap-[14px] pt-[95px]">
        <p className="text-sm font-semibold text-[#BCBCBC]">우리집 구성원</p>

        <div className="grid grid-cols-5 gap-4">
          {members.map((member) => (
            <UserProfile key={member.id} name={member.nickname} src={Profile} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HouseConfirmStep;
