import type { JoinRoomRequest, RoomResponse } from '@/api/room/room.types';

import { apiClient } from '@/api/client';

// 방 생성
export const createRoom = async () => {
  const { data } = await apiClient.post<RoomResponse>('/api/rooms');
  return data;
};

// 방 입장
export const joinRoom = async (payload: JoinRoomRequest) => {
  const { data } = await apiClient.post<RoomResponse>(
    '/api/rooms/join',
    payload
  );
  return data;
};

// 방 나가기
export const leaveRoom = async () => {
  await apiClient.delete('/api/rooms/leave');
};
