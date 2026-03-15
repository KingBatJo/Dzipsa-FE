import { z } from 'zod';

export const TODO_TITLE_MAX_LENGTH = 30;
export const TODO_MEMO_MAX_LENGTH = 300;

export const todoCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, '제목을 입력해주세요')
    .max(
      TODO_TITLE_MAX_LENGTH,
      `${TODO_TITLE_MAX_LENGTH}글자 이내로 입력해주세요`
    ),
  memo: z
    .string()
    .max(
      TODO_MEMO_MAX_LENGTH,
      `${TODO_MEMO_MAX_LENGTH}글자 이내로 입력해주세요`
    )
    .optional()
    .or(z.literal('')),
});

export type TodoCreateValues = z.infer<typeof todoCreateSchema>;
