export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  room: {
    myRoom: ['room', 'myRoom'] as const,
    invitationCode: ['room', 'invitationCode'] as const,
  },
};
