// 빈 문자열 여부 확인 (공백 제외)
export const validateRequiredText = (text: string) => {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return '1글자 이상 입력해주세요';
  }

  return '';
};

// 최대 글자 수 초과 여부 확인
export const validateTextMaxLength = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${maxLength}글자 이내로 입력해주세요`;
  }

  return '';
};
