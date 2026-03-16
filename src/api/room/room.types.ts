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
  motto: string;
  ownerId: number;
  membersCount: number;
  score: number;
  invitationCode: string;
  ruleWarningCount: string;
  delayTaskCount: string;
  members: RoomMemberResponse[];
  createdAt: string;
  updatedAt: string;
};

export type GetRoomMembersParams = {
  excludeMe?: boolean;
};
