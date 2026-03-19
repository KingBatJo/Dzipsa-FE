import { z } from 'zod';

export const RULE_TITLE_MAX_LENGTH = 30;
export const RULE_MEMO_MAX_LENGTH = 300;

export const ruleCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, '규칙을 입력해주세요')
    .max(
      RULE_TITLE_MAX_LENGTH,
      `${RULE_TITLE_MAX_LENGTH}글자 이내로 입력해주세요`
    ),
  memo: z
    .string()
    .max(
      RULE_MEMO_MAX_LENGTH,
      `${RULE_MEMO_MAX_LENGTH}글자 이내로 입력해주세요`
    )
    .optional()
    .or(z.literal('')),
});

export type RuleCreateValues = z.infer<typeof ruleCreateSchema>;
