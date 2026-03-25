import axios from 'axios';

export type ApiErrorInfo = {
  code: number;
  message: string;
};

export const getApiErrorInfo = (error: unknown): ApiErrorInfo | null => {
  if (axios.isAxiosError<ApiErrorInfo>(error)) {
    const data = error.response?.data;
    if (data) return data;
  }
  return null;
};

export const getApiErrorMessage = (error: unknown) => {
  return getApiErrorInfo(error)?.message ?? '요청 처리 중 오류가 발생했어요.';
};
