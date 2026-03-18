import type { MeResponse } from '@/api/auth/auth.types';
import { createRoom, leaveRoom } from '@/api/room/room.api';
import type { CreateRoomRequest } from '@/api/room/room.types';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

export const useCreateRoomMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateRoomRequest) => createRoom(payload),
  });
};

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
