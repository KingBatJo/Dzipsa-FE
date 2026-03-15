import type { REPEAT_TYPE_OPTIONS } from '@/constants/todos';
import type { WeekDay } from '@/components/form/WeekdaySelector';

// 임시
export type Todo = {
  id: number;
  title: string;
  dueAt: string;
  assigneeId: number;
  memo?: string;
  completed: boolean;
  completedAt?: string;
  proofImageUrl?: string;
};

export type RepeatType = (typeof REPEAT_TYPE_OPTIONS)[number];

export type TodoCreateRequest = {
  title: string;
  roomId: number;
  assigneeId: number;
  dueDate: string;
  isRepeat: boolean;
  repeatOption: {
    type: RepeatType;
    dayOfWeeks: WeekDay[];
    startDate: string;
    endDate: string;
  } | null;
  memo: string;
};
