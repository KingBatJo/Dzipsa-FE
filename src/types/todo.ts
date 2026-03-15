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
