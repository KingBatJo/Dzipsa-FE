export type Rule = {
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
  notiEnabled: boolean;
  warningDisabled: boolean;
};
