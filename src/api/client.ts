// axios 인스턴스 + 공통 설정

import { tokenStorage } from '@/auth/token';
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 재시도 여부를 저장하기 위해 요청 타입 확장
type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshResponse = {
  accessToken: string;
};

const redirectToLogin = () => {
  tokenStorage.clearAccessToken();
  window.location.replace('/login');
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// accessToken 재발급 요청
const refreshAccessToken = async () => {
  const response = await axios.post<RefreshResponse>(
    '/api/auth/refresh',
    null,
    {
      baseURL: BASE_URL,
      withCredentials: true,
    }
  );

  return response.data.accessToken;
};

// 요청 보내기 전 실행
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenStorage.getAccessToken();

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 받은 후 실행
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;

    if (!originalRequest || !status) {
      return Promise.reject(error);
    }

    const isRefreshRequest =
      typeof originalRequest.url === 'string' &&
      originalRequest.url.includes('/api/auth/refresh');

    // 401 + 아직 재시도 안 함 + refresh 요청이 아님
    if (status === 401 && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        tokenStorage.setAccessToken(newAccessToken);
        originalRequest.headers.set(
          'Authorization',
          `Bearer ${newAccessToken}`
        );

        return apiClient(originalRequest);
      } catch (refreshError) {
        redirectToLogin();

        return Promise.reject(refreshError);
      }
    }

    // refresh 요청 자체가 401이면 로그인으로 이동
    if (status === 401 && isRefreshRequest) redirectToLogin();

    return Promise.reject(error);
  }
);
