export type Todo = {
  id: string;
  title: string;
  dueAt: string;
  assigneeId: string;
  memo?: string;
  completed: boolean;
};
