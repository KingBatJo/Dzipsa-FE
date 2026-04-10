import { NICKNAME_MAX_LENGTH, PROFILE_OPTIONS } from '@/constants/onboarding';
import { useRef, useState } from 'react';
import {
  validateRequiredText,
  validateTextMaxLength,
} from '@/utils/validators';

import { Button } from '@/components/ui/button';
import EditableInputSection from '@/components/form/EditableInputSection';
import ProfilePickerSheet from '@/pages/onboarding/components/ProfilePickerSheet';
import { RefreshCw } from 'lucide-react';
import { getProfileOptionById } from '@/api/room/room.utils';

type ProfileStepProps = {
  nickname: string;
  selectedProfileId: string;
  usedProfileIds: string[];
  onChangeNickname: (nickname: string) => void;
  onChangeProfile: (profileId: string) => void;
};

const ProfileStep = ({
  nickname,
  selectedProfileId,
  usedProfileIds,
  onChangeNickname,
  onChangeProfile,
}: ProfileStepProps) => {
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const selectedProfile = getProfileOptionById(selectedProfileId);

  const handleSelectProfile = (profileId: string) => {
    const isUsed = usedProfileIds.includes(profileId);

    if (isUsed && profileId !== selectedProfileId) {
      return;
    }

    onChangeProfile(profileId);
    setIsProfileSheetOpen(false);
  };

  const handleChangeNickname = (nextNickname: string) => {
    const maxLengthError = validateTextMaxLength(
      nextNickname,
      NICKNAME_MAX_LENGTH
    );

    if (maxLengthError) {
      setErrorMessage(maxLengthError);
      return;
    }

    onChangeNickname(nextNickname);

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleBlurNickname = () => {
    setErrorMessage(validateRequiredText(nickname));
  };

  return (
    <div>
      <section className="flex flex-col gap-1 p-7.5">
        <h1 className="text-xl leading-[1.4] font-semibold">
          나를 표현할 프로필과
          <br />
          닉네임을 설정해주세요.
        </h1>

        <p className="text-sm font-medium text-zinc-400">
          설정하지 않으면 연동된 계정의 닉네임으로 적용됩니다.
        </p>
      </section>

      <section className="flex justify-center px-28 py-7.5">
        <div className="relative">
          <img
            src={selectedProfile.imageUrl}
            alt={selectedProfile.alt}
            className="h-35 w-35"
          />

          <Button
            onClick={() => setIsProfileSheetOpen(true)}
            className="absolute -right-3 bottom-0 h-fit rounded-xl bg-zinc-500 p-2.5 outline-2 outline-white [&>svg]:h-6 [&>svg]:w-6"
          >
            <RefreshCw />
          </Button>
        </div>
      </section>

      <EditableInputSection
        id="nickname"
        inputRef={inputRef}
        value={nickname}
        placeholder="닉네임을 입력해주세요"
        errorMessage={errorMessage}
        maxLength={NICKNAME_MAX_LENGTH}
        onChange={handleChangeNickname}
        onBlur={handleBlurNickname}
        className="px-10"
      />

      {/* 프로필 설정 */}
      <ProfilePickerSheet
        open={isProfileSheetOpen}
        onOpenChange={setIsProfileSheetOpen}
        profiles={PROFILE_OPTIONS}
        selectedProfileId={selectedProfileId}
        usedProfileIds={usedProfileIds}
        onSelectProfile={handleSelectProfile}
      />
    </div>
  );
};

export default ProfileStep;
