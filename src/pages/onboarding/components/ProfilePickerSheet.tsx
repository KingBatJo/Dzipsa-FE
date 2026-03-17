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
      <div className="px-5 pt-4 pb-8">
        <div className="pb-4">
          <h2 className="text-lg font-semibold">
            주인님의 먼지는 어떤 먼지인가요?
          </h2>

          <p className="pt-1 text-sm font-medium text-[#BCBCBC]">
            치워도 치워도 다시 쌓이는 건 사랑 아니면 먼지뿐입니다
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
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
                      'block aspect-square h-[100px] w-[100px] rounded-full',
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
      </div>
    </BottomSheet>
  );
};

export default ProfilePickerSheet;
