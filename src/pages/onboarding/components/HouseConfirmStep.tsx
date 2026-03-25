import type { RoomMemberResponse } from '@/api/room/room.types';
import UserProfile from '@/components/common/UserProfile';
import { getProfileOptionById } from '@/api/room/room.utils';
import roommateCheck from '@/assets/image/onboarding/roommate-check.png';

type HouseConfirmStepProps = {
  members: RoomMemberResponse[];
};

const HouseConfirmStep = ({ members }: HouseConfirmStepProps) => {
  const visibleMembers = members.slice(0, 5);
  const startColumn = Math.floor((5 - visibleMembers.length) / 2) + 1;

  return (
    <div className="flex flex-col">
      <section className="p-7.5 text-lg font-semibold">
        <p>기다리고 있었어요!</p>
        <p>입장하시는 집이 맞나요?</p>
      </section>

      <div className="relative w-full">
        <img
          src={roommateCheck}
          alt=""
          className="pointer-events-none absolute bottom-34 left-1/2 z-10 h-[134px] w-[141px] -translate-x-1/2"
        />

        <section className="mt-46.5 flex w-full flex-col gap-[14px] p-4">
          <div className="flex flex-col gap-2 rounded-[18px] bg-zinc-100 px-7.5 pt-4 pb-4">
            <p className="text-sm font-semibold text-[#BCBCBC]">
              우리집 구성원
            </p>

            <div className="grid grid-cols-5 gap-10">
              {visibleMembers.map((member, index) => {
                const profile = getProfileOptionById(member.profileImageUrl);
                const gridColumnStart = startColumn + index;

                return (
                  <div
                    key={member.id}
                    className="justify-self-center"
                    style={{ gridColumnStart }}
                  >
                    <UserProfile
                      name={member.nickname}
                      src={profile.imageUrl}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HouseConfirmStep;
