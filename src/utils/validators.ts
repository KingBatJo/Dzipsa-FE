export const validateRequiredText = (text: string) => {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return '1글자 이상 입력해주세요';
  }

  return '';
};

export const validateTextMaxLength = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${maxLength}글자 이내로 입력해주세요`;
  }

  return '';
};
