import type {
  CreateRoomRequest,
  GetRoomMembersParams,
  GetUsedProfileImagesParams,
  GetUsedProfileImagesResponse,
  InvitationCodeResponse,
  JoinRoomRequest,
  MyRoomResponse,
  RoomMemberResponse,
  RoomResponse,
} from '@/api/room/room.types';

import { apiClient } from '@/api/client';

// 방 생성
export const createRoom = async (
  payload: CreateRoomRequest
): Promise<RoomResponse> => {
  const { data } = await apiClient.post<RoomResponse>('/api/rooms', payload);
  return data;
};

// 방 입장
export const joinRoom = async (
  payload: JoinRoomRequest
): Promise<RoomResponse> => {
  const { data } = await apiClient.post<RoomResponse>(
    '/api/rooms/join',
    payload
  );
  return data;
};

// 내 방 조회
export const getMyRoom = async (): Promise<MyRoomResponse> => {
  const { data } = await apiClient.get<MyRoomResponse>('/api/rooms/me');
  return data;
};

// 방 구성원 조회
export const getRoomMembers = async (
  params?: GetRoomMembersParams
): Promise<RoomMemberResponse[]> => {
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
): Promise<GetUsedProfileImagesResponse> => {
  const { data } = await apiClient.get<GetUsedProfileImagesResponse>(
    '/api/rooms/used-profile-images',
    {
      params,
    }
  );

  return data;
};

// 방 나가기
export const leaveRoom = async (): Promise<void> => {
  await apiClient.delete('/api/rooms/leave');
};

// 구성원 내보내기
export const kickRoomMember = async (memberUserId: number): Promise<void> => {
  await apiClient.delete(`/api/rooms/members/${memberUserId}`);
};

// 초대 코드 조회
export const getInvitationCode = async (): Promise<InvitationCodeResponse> => {
  const { data } = await apiClient.get<InvitationCodeResponse>(
    '/api/rooms/invitation-code'
  );
  return data;
};

// 초대 코드 재발급
export const reissueInvitationCode =
  async (): Promise<InvitationCodeResponse> => {
    const { data } = await apiClient.post<InvitationCodeResponse>(
      '/api/rooms/invitation-code/reissue'
    );
    return data;
  };
