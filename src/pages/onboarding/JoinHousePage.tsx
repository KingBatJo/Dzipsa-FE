import { OTP_LENGTH, PROFILE_OPTIONS } from '@/constants/onboarding';
import type { RoomMemberResponse, RoomResponse } from '@/api/room/room.types';
import { useMeQuery, useUpdateMeMutation } from '@/api/auth/auth.query';

import { Button } from '@/components/ui/button';
import HouseConfirmStep from '@/pages/onboarding/components/HouseConfirmStep';
import InviteCodeInputStep from '@/pages/onboarding/components/InviteCodeInputStep';
import OnboardingFlowLayout from '@/pages/onboarding/components/OnboardingFlowLayout';
import ProfileStep from '@/pages/onboarding/components/ProfileStep';
import { getApiErrorMessage } from '@/api/error';
import { getRoomMembers } from '@/api/room/room.api';
import { toast } from 'sonner';
import { useJoinRoomMutation } from '@/api/room/room.query';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { useState } from 'react';

const JoinHousePage = () => {
  const navigate = useNavigate();
  const [joinedRoom, setJoinedRoom] = useState<RoomResponse | null>(null);
  const [members, setMembers] = useState<RoomMemberResponse[]>([]);
  const [usedProfileIds, setUsedProfileIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    joinFlow,
    setJoinStep,
    updateJoinFlow,
    setJoinNickname,
    resetOnboarding,
  } = useOnboardingStore();

  const { step, inviteCode, nickname, selectedProfileId } = joinFlow;
  const { data: me } = useMeQuery();
  const { mutateAsync: updateMeMutate } = useUpdateMeMutation();
  const { mutateAsync: joinRoomMutate } = useJoinRoomMutation();

  const getSafeNickname = (value: string) => {
    return value.trim() || me?.nickname || '';
  };

  const submitProfile = async () => {
    const safeNickname = getSafeNickname(nickname);

    await updateMeMutate({
      nickname: safeNickname,
      profileImageUrl: selectedProfileId,
    });
  };

  const handleChangeInviteCode = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    updateJoinFlow({ inviteCode: numericValue });

    if (joinedRoom) {
      setJoinedRoom(null);
    }

    if (members.length > 0) {
      setMembers([]);
    }

    if (hasError) {
      setHasError(false);
    }
  };

  const handleBack = () => {
    if (step === 'invite') {
      navigate('/onboarding');
      return;
    }

    if (step === 'confirm') {
      setJoinStep('invite');
      return;
    }

    if (step === 'profile') {
      setUsedProfileIds([]);
      setJoinStep('confirm');
      return;
    }
  };

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);

      await submitProfile();

      resetOnboarding();
      navigate('/home', { replace: true });
    } catch (error) {
      const message = getApiErrorMessage(error);

      console.error('내 정보 수정 실패:', message, error);

      toast(message, {
        id: 'update-me-error',
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (step === 'invite') {
      if (joinedRoom) {
        setJoinStep('confirm');
        return;
      }

      try {
        setIsSubmitting(true);

        const room = await joinRoomMutate({ invitationCode: inviteCode });
        const roomMembers = await getRoomMembers({ excludeMe: true });

        setJoinedRoom(room);
        setMembers(roomMembers);
        setHasError(false);
        setJoinStep('confirm');
      } catch (error) {
        const message = getApiErrorMessage(error);

        console.error('방 입장 실패: ', message, error);

        setHasError(true);
        toast(message, {
          id: 'invalid-invite-code',
          duration: 2000,
        });
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    if (step === 'confirm') {
      const usedByOthers = members.map((member) => member.profileImageUrl);

      setUsedProfileIds(usedByOthers);

      const isCurrentSelectedUsedByOthers =
        usedByOthers.includes(selectedProfileId);

      if (isCurrentSelectedUsedByOthers) {
        const availableProfile = PROFILE_OPTIONS.find(
          (profile) => !usedByOthers.includes(profile.id)
        );

        if (availableProfile) {
          updateJoinFlow({ selectedProfileId: availableProfile.id });
        }
      }

      setJoinStep('profile');

      return;
    }

    if (step === 'profile') {
      await handleComplete();
    }
  };

  const handleSkip = async () => {
    if (step !== 'profile') return;

    updateJoinFlow({
      nickname: getSafeNickname(nickname),
    });
    await handleComplete();
  };

  const buttonLabel =
    step === 'invite'
      ? '집 찾기'
      : step === 'confirm'
        ? '우리집 맞아요!'
        : '다음';

  const isNextDisabled =
    isSubmitting ||
    (step === 'invite' ? inviteCode.length !== OTP_LENGTH : false) ||
    (step === 'profile' && !nickname.trim());

  const bottomSlot =
    step === 'profile' ? (
      <div className="flex items-center justify-center">
        <Button
          variant="link"
          onClick={handleSkip}
          className="h-fit p-0 font-semibold text-[#888888]"
        >
          Skip
        </Button>
      </div>
    ) : (
      <div className="h-5" />
    );

  return (
    <OnboardingFlowLayout
      onBack={handleBack}
      onNext={handleNext}
      isNextDisabled={isNextDisabled}
      nextLabel={buttonLabel}
      bottomSlot={bottomSlot}
    >
      {step === 'invite' && (
        <InviteCodeInputStep
          inviteCode={inviteCode}
          hasError={hasError}
          onChangeInviteCode={handleChangeInviteCode}
        />
      )}

      {step === 'confirm' && joinedRoom && (
        <HouseConfirmStep members={members} />
      )}

      {step === 'profile' && (
        <ProfileStep
          nickname={nickname}
          selectedProfileId={selectedProfileId}
          usedProfileIds={usedProfileIds}
          onChangeNickname={setJoinNickname}
          onChangeProfile={(value) =>
            updateJoinFlow({ selectedProfileId: value })
          }
        />
      )}
    </OnboardingFlowLayout>
  );
};

export default JoinHousePage;
