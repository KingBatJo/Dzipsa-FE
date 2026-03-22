import {
  createRoom,
  getInvitationCode,
  getMyRoom,
  joinRoom,
  leaveRoom,
  reissueInvitationCode,
} from '@/api/room/room.api';
import { useMutation, useQuery } from '@tanstack/react-query';

import type { MeResponse } from '@/api/auth/auth.types';
import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

// Queries
// 내 방 정보 조회
export const useMyRoomQuery = () => {
  return useQuery({
    queryKey: queryKeys.room.myRoom,
    queryFn: getMyRoom,
    staleTime: 1000 * 60 * 5,
  });
};

// 초대 코드 조회
export const useInvitationCodeQuery = () => {
  return useQuery({
    queryKey: queryKeys.room.invitationCode,
    queryFn: getInvitationCode,
    staleTime: 1000 * 60,
  });
};

// Mutations
// 방 생성
export const useCreateRoomMutation = () => {
  return useMutation({
    mutationFn: createRoom,
  });
};

// 방 입장
export const useJoinRoomMutation = () => {
  return useMutation({
    mutationFn: joinRoom,
  });
};

// 초대 코드 재발급
export const useReissueInvitationCodeMutation = () => {
  return useMutation({
    mutationFn: reissueInvitationCode,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.room.invitationCode, data);
    },
  });
};

// 방 나가기
export const useLeaveRoomMutation = () => {
  return useMutation({
    mutationFn: leaveRoom,
    onSuccess: () => {
      queryClient.setQueryData(
        queryKeys.auth.me,
        (prev: MeResponse | undefined) =>
          prev ? { ...prev, hasRoom: false } : prev
      );
      queryClient.removeQueries({ queryKey: queryKeys.room.myRoom });
      queryClient.removeQueries({ queryKey: queryKeys.room.invitationCode });
    },
  });
};
