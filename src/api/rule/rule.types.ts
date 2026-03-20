export type GetRulesParams = {
  cursor?: number;
  size?: number;
};

export type RuleId = number;

export type RuleListItemResponse = {
  id: number;
  roomId: number;
  registerId: number;
  title: string;
  memo: string | null;
  timeSettingEnabled: boolean;
  startTime: string | null;
  endTime: string | null;
  repeatEnabled: boolean;
  repeatDays: string | null;
  warningDisabled: boolean;
};

export type RuleDetailResponse = RuleListItemResponse & {
  notiEnabled: boolean;
};

export type CreateRuleRequest = {
  title: string;
  memo: string | null;
  timeSettingEnabled: boolean;
  startTime: string | null;
  endTime: string | null;
  repeatEnabled: boolean;
  repeatDays: string | null;
  notiEnabled: boolean;
};

export type CreateRuleResponse = RuleDetailResponse;

export type UpdateRuleRequest = CreateRuleRequest;

export type UpdateRuleResponse = RuleDetailResponse;

export type UpdateRuleParams = {
  ruleId: RuleId;
  payload: UpdateRuleRequest;
};

export type RecentWarningItemResponse = {
  id: number;
  roomId: number;
  ruleId: RuleId;
  ruleTitle: string;
  createdAt: string;
};
