import { NICKNAME_MAX_LENGTH, PROFILE_OPTIONS } from '@/constants/onboarding';
import { useRef, useState } from 'react';
import {
  validateRequiredText,
  validateTextMaxLength,
} from '@/utils/validators';

import { Button } from '@/components/ui/button';
import EditableInput from '@/pages/onboarding/components/EditableInput';
import ProfilePickerSheet from '@/pages/onboarding/components/ProfilePickerSheet';
import { RefreshCw } from 'lucide-react';

type ProfileStepProps = {
  nickname: string;
  selectedProfileId: number;
  onChangeNickname: (nickname: string) => void;
  onChangeProfile: (profileId: number) => void;
};

const ProfileStep = ({
  nickname,
  selectedProfileId,
  onChangeNickname,
  onChangeProfile,
}: ProfileStepProps) => {
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const selectedProfile =
    PROFILE_OPTIONS.find((profile) => profile.id === selectedProfileId) ??
    PROFILE_OPTIONS[0];

  const handleSelectProfile = (profileId: number) => {
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
    <div className="pt-3">
      <section className="flex flex-col gap-2 px-2 pb-10">
        <h1 className="text-xl font-semibold">
          나를 표현할 프로필과
          <br />
          닉네임을 설정해주세요
        </h1>
      </section>

      <section className="flex justify-center pb-14">
        <div className="relative">
          <img src={selectedProfile.imageUrl} alt={selectedProfile.alt} />

          <Button
            onClick={() => setIsProfileSheetOpen(true)}
            className="absolute -right-3 bottom-0 h-fit rounded-xl p-[9px] outline-2 outline-white [&>svg]:h-6 [&>svg]:w-6"
          >
            <RefreshCw />
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-1 px-10">
        <EditableInput
          id="nickname"
          ref={inputRef}
          value={nickname}
          placeholder="닉네임을 입력해주세요"
          errorMessage={errorMessage}
          onChange={handleChangeNickname}
          onBlur={handleBlurNickname}
        />

        <div className="flex justify-end text-xs font-semibold text-[#BCBCBC]">
          최대 {NICKNAME_MAX_LENGTH}글자
        </div>
      </section>

      {/* 임시 (테스트용) */}
      {
        <p className="flex justify-center text-xs">
          선택 프로필(확인용): {selectedProfile.alt}
        </p>
      }

      {/* 프로필 설정 */}
      <ProfilePickerSheet
        open={isProfileSheetOpen}
        onOpenChange={setIsProfileSheetOpen}
        profiles={PROFILE_OPTIONS}
        selectedProfileId={selectedProfileId}
        onSelectProfile={handleSelectProfile}
      />
    </div>
  );
};

export default ProfileStep;
