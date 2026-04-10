import { useMeQuery, useUpdateMeMutation } from '@/api/auth/auth.query';

import HouseWelcomeDialog from '@/pages/onboarding/components/HouseWelcomeDialog';
import InviteCodeStep from '@/pages/onboarding/components/InviteCodeStep';
import MottoStep from '@/pages/onboarding/components/MottoStep';
import OnboardingFlowLayout from '@/pages/onboarding/components/OnboardingFlowLayout';
import ProfileStep from '@/pages/onboarding/components/ProfileStep';
import type { RoomResponse } from '@/api/room/room.types';
import { getApiErrorMessage } from '@/api/error';
import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';
import { toast } from 'sonner';
import { useCreateRoomMutation } from '@/api/room/room.query';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { useState } from 'react';

const CreateHousePage = () => {
  const navigate = useNavigate();
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [createdRoom, setCreatedRoom] = useState<RoomResponse>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    createFlow,
    setCreateStep,
    updateCreateFlow,
    setCreateNickname,
    resetOnboarding,
  } = useOnboardingStore();

  const { step, motto, nickname, selectedProfileId } = createFlow;
  const { data: me } = useMeQuery();
  const { mutateAsync: updateMeMutate } = useUpdateMeMutation();
  const { mutateAsync: createRoomMutate } = useCreateRoomMutation();

  const getSafeNickname = (value: string) => {
    return value.trim() || me?.nickname || '';
  };

  const moveToInvite = async () => {
    if (createdRoom) {
      setCreateStep('invite');
      return;
    }

    const room = await createRoomMutate({
      name: null,
      motto: motto.trim() || null,
    });

    setCreatedRoom(room);
    setCreateStep('invite');
  };

  const submitProfile = async () => {
    const safeNickname = getSafeNickname(nickname);

    await updateMeMutate({
      nickname: safeNickname,
      profileImageUrl: selectedProfileId,
    });
  };

  const handleBack = () => {
    if (step === 'profile') {
      setCreateStep('motto');
      return;
    }

    if (step === 'invite') {
      setCreateStep('profile');
      return;
    }

    navigate('/onboarding');
  };

  const handleNext = async () => {
    if (step === 'motto') {
      setCreateStep('profile');
      return;
    }

    if (step === 'profile') {
      try {
        setIsSubmitting(true);

        await submitProfile();
        await moveToInvite();
      } catch (error) {
        const message = getApiErrorMessage(error);

        console.error('프로필 설정 또는 방 생성 실패:', message, error);

        toast(message, {
          id: 'create-house-profile-error',
          duration: 2000,
        });
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    setIsCompleteOpen(true);
  };

  const handleConfirm = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });

    resetOnboarding();
    navigate('/home', { replace: true });
  };

  const buttonLabel = step === 'invite' ? '우리집 입장하기' : '다음';

  const isNextDisabled =
    isSubmitting ||
    (step === 'motto' && !motto.trim()) ||
    (step === 'profile' && !nickname.trim());

  const bottomSlot = step === 'invite' && (
    <div className="h-5 text-center text-sm font-medium text-zinc-400">
      코드는 마이페이지에서도 언제든 확인할 수 있어요!
    </div>
  );

  return (
    <>
      <OnboardingFlowLayout
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={isNextDisabled}
        nextLabel={buttonLabel}
        bottomSlot={bottomSlot}
      >
        {step === 'motto' && (
          <MottoStep
            motto={motto}
            onChangeMotto={(value) => updateCreateFlow({ motto: value })}
          />
        )}

        {step === 'profile' && (
          <ProfileStep
            nickname={nickname}
            selectedProfileId={selectedProfileId}
            usedProfileIds={[]}
            onChangeNickname={setCreateNickname}
            onChangeProfile={(value) =>
              updateCreateFlow({ selectedProfileId: value })
            }
          />
        )}

        {step === 'invite' && createdRoom && (
          <InviteCodeStep inviteCode={createdRoom.invitationCode} />
        )}
      </OnboardingFlowLayout>

      <HouseWelcomeDialog open={isCompleteOpen} onConfirm={handleConfirm} />
    </>
  );
};

export default CreateHousePage;
