import type {
  GetRoomMembersParams,
  GetUsedProfileImagesParams,
  GetUsedProfileImagesResponse,
  JoinRoomRequest,
  RoomMemberResponse,
  RoomResponse,
} from '@/api/room/room.types';

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

// 방 구성원 조회
export const getRoomMembers = async (params?: GetRoomMembersParams) => {
  const { data } = await apiClient.get<RoomMemberResponse[]>(
    '/api/rooms/members',
    {
      params,
    }
  );
  return data;
};

// 사용 중인 프로필 조회
export const getUsedProfileImages = async (
  params?: GetUsedProfileImagesParams
) => {
  const { data } = await apiClient.get<GetUsedProfileImagesResponse>(
    '/api/rooms/used-profile-images',
    {
      params,
    }
  );

  return data;
};

// 방 나가기
export const leaveRoom = async () => {
  await apiClient.delete('/api/rooms/leave');
};
