import axios from 'axios';

type ApiErrorResponse = {
  code: number;
  message: string;
};

export const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? '요청 처리 중 오류가 발생했어요.';
  }

  return '알 수 없는 오류가 발생했어요.';
};
