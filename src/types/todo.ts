export type Todo = {
  id: string;
  title: string;
  dueAt: string;
  assigneeId: number;
  memo?: string;
  completed: boolean;
  completedAt?: string;
  proofImageUrl?: string;
};
