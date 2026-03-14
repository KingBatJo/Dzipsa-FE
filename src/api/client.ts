// axios 인스턴스 + 공통 설정
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { refresh } from '@/api/auth/auth.api';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

let refreshPromise: Promise<string> | null = null;

// 재시도 여부를 저장하기 위해 요청 타입 확장
type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const redirectToLogin = () => {
  const { clearAuth } = useAuthStore.getState();
  clearAuth();

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

// refresh 중복 호출 방지
const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = refresh()
      .then((data) => data.accessToken)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// 요청 전 accessToken이 있으면 Authorization 헤더에 추가
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답에서 401이 오면 accessToken 재발급 후 원래 요청 재시도
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

    // 401 + 아직 재시도 안 함 + refresh 요청이 아님 -> 토큰 재발급 후 한 번만 재시도
    if (status === 401 && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        const { setAccessToken } = useAuthStore.getState();
        setAccessToken(newAccessToken);

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

    // refresh 요청 자체가 실패하면 더 이상 복구 불가이므로 로그인으로 이동
    if (status === 401 && isRefreshRequest) redirectToLogin();

    return Promise.reject(error);
  }
);
