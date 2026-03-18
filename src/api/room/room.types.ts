export type CreateRoomRequest = {
  name: string | null;
  motto: string | null;
};

export type JoinRoomRequest = {
  invitationCode: string;
};

export type RoomMemberResponse = {
  id: number;
  nickname: string;
  profileImageUrl: string;
};

export type RoomResponse = {
  id: number;
  name: string;
  motto: string | null;
  ownerId: number;
  membersCount: number;
  score: number;
  invitationCode: string;
  ruleWarningCount: number | null;
  delayTaskCount: number | null;
  members: RoomMemberResponse[];
  createdAt: string;
  updatedAt: string;
};

export type MyRoomResponse = {
  id: number;
  name: string;
  motto: string | null;
  ownerId: number;
  membersCount: number;
  score: number;
  invitationCode: string | null;
  ruleWarningCount: number | null;
  delayTaskCount: number | null;
  members: RoomMemberResponse[];
  createdAt: string;
  updatedAt: string;
};

export type GetRoomMembersParams = {
  excludeMe?: boolean;
};

export type GetUsedProfileImagesParams = {
  invitationCode?: string;
};

export type GetUsedProfileImagesResponse = {
  usedImages: string[];
};

export type InvitationCodeResponse = {
  invitationCode: string;
  reissueAvailableAt: string;
};
