import BottomSheet from '@/components/common/BottomSheet';
import { cn } from '@/lib/utils';

type ProfileOption = {
  id: string;
  imageUrl: string;
  alt: string;
};

type ProfilePickerSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profiles: readonly ProfileOption[];
  selectedProfileId: string;
  usedProfileIds: string[];
  onSelectProfile: (profileId: string) => void;
};

const ProfilePickerSheet = ({
  open,
  onOpenChange,
  profiles,
  selectedProfileId,
  usedProfileIds,
  onSelectProfile,
}: ProfilePickerSheetProps) => {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-[5px] px-5 pt-8 pb-[15px]">
        <h2 className="text-lg leading-[1.3] font-semibold">
          함께할 먼지를 선택해 주세요!
        </h2>
        <p className="text-sm leading-[1.3] font-medium text-[#BCBCBC]">
          먼지는 우리가 함께 살아온 시간을 담은 작은 흔적이에요.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 px-5 pb-8.5">
        {profiles.map((profile) => {
          const isSelected = profile.id === selectedProfileId;
          const isUsed = usedProfileIds.includes(profile.id);
          const isDisabled = isUsed && !isSelected;

          return (
            <button
              key={profile.id}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectProfile(profile.id)}
              className="flex justify-center"
              aria-pressed={isSelected}
              aria-disabled={isDisabled}
            >
              <div className="relative">
                <img
                  src={profile.imageUrl}
                  alt={profile.alt}
                  className={cn(
                    'block aspect-square h-25 w-25 rounded-full',
                    isSelected ? 'border-[3px] border-blue-400' : ''
                  )}
                />

                {isDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                    <span className="text-lg leading-6 font-semibold text-white">
                      이미
                      <br />
                      사용중
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
};

export default ProfilePickerSheet;
