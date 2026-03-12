// 토큰 저장소

let accessToken: string | null = null;

export const tokenStorage = {
  getAccessToken: () => accessToken,

  setAccessToken: (token: string) => {
    accessToken = token;
  },

  clearAccessToken: () => {
    accessToken = null;
  },
};
