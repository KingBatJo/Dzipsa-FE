import type { RoomMemberResponse, RoomResponse } from '@/api/room/room.types';
import { getRoomMembers, joinRoom } from '@/api/room/room.api';

import { Button } from '@/components/ui/button';
import HouseConfirmStep from '@/pages/onboarding/components/HouseConfirmStep';
import InviteCodeInputStep from '@/pages/onboarding/components/InviteCodeInputStep';
import { OTP_LENGTH } from '@/constants/onboarding';
import OnboardingFlowLayout from '@/pages/onboarding/components/OnboardingFlowLayout';
import ProfileStep from '@/pages/onboarding/components/ProfileStep';
import { getApiErrorMessage } from '@/api/error';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { useState } from 'react';

const JoinHousePage = () => {
  const navigate = useNavigate();
  const [joinedRoom, setJoinedRoom] = useState<RoomResponse | null>(null);
  const [members, setMembers] = useState<RoomMemberResponse[]>([]);
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

  const userNickname = useAuthStore((state) => state.user?.nickname);

  const getSafeNickname = (value: string) => {
    return value.trim() || userNickname || '';
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
      setJoinStep('confirm');
      return;
    }
  };

  const handleComplete = () => {
    const safeNickname = getSafeNickname(nickname);

    console.log({
      nickname: safeNickname,
      selectedProfileId,
    });

    resetOnboarding();
    navigate('/home', { replace: true });
  };

  const handleNext = async () => {
    if (step === 'invite') {
      if (joinedRoom) {
        setJoinStep('confirm');
        return;
      }

      try {
        setIsSubmitting(true);

        const room = await joinRoom({ invitationCode: inviteCode });
        const roomMembers = await getRoomMembers({ excludeMe: true });

        console.log('방 입장: ', room);
        console.log('방 구성원: ', roomMembers);

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
      setJoinStep('profile');
      return;
    }

    if (step === 'profile') {
      handleComplete();
    }
  };

  const handleSkip = () => {
    if (step !== 'profile') return;

    updateJoinFlow({
      nickname: getSafeNickname(nickname),
    });
    handleComplete();
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
