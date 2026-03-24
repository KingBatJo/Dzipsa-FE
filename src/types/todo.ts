import type { REPEAT_TYPE_OPTIONS } from '@/constants/todos';
import type { WeekDay } from '@/constants/weekdays';

// 임시
export type Todo = {
  id: number;
  title: string;
  dueAt: string;
  createdAt: string;
  assigneeId: number;
  memo?: string;
  completed: boolean;
  completedAt?: string;
  proofImageUrl?: string;
};

export type TodoWithLocal = Todo & {
  local: {
    dueDate: string;
    completedDate?: string;
  };
};

export type TodoStatusLabel = '진행중' | '지연' | '완료' | '지연 완료';

export type TodoDetailViewState = {
  isMine: boolean;
  isCompleted: boolean;
  hasProofImage: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canConfirmComplete: boolean;
  canPhotoComplete: boolean;
  canRevertToInProgress: boolean;
  canAddProofImage: boolean;
};

export type RepeatType = (typeof REPEAT_TYPE_OPTIONS)[number];

export type RepeatValue = {
  enabled: boolean;
  type: RepeatType;
  days: WeekDay[];
  monthlyDay: number;
  startDate: Date;
  endDate: Date | null;
};

export type TodoFormValues = {
  title: string;
  memo: string;
  dueDate: Date | null;
  assigneeId: number;
  isRandom: boolean;
  repeatValue: RepeatValue;
};

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
