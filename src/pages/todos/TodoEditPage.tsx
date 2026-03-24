import { toCreateTodoPayload, toPrefilledRepeatValue } from '@/utils/todoForm';
import { useLocation, useNavigate } from 'react-router-dom';

import TodoForm from '@/pages/todos/components/TodoForm';
import type { TodoFormValues } from '@/types/todo';
import type { TodoRecurringType } from '@/api/todo/todo.types';
import { toast } from 'sonner';
import { useUpdateTodoMutation } from '@/api/todo/todo.query';

type EditTodoLocationState = {
  todoId: number;
  title: string;
  memo: string | null;
  targetDate: string | null;
  assigneeId: number;
  isRandom: boolean;
  recurringType: TodoRecurringType;
  repeatDays: string | null;
  startDate: string;
  endDate: string | null;
};

const TodoEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutateAsync: updateTodo, isPending } = useUpdateTodoMutation();

  const todo = location.state as EditTodoLocationState | undefined;

  if (!todo) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-base font-medium">수정할 할 일 정보가 없어요.</p>
      </div>
    );
  }

  const initialValues: Partial<TodoFormValues> = {
    title: todo.title,
    memo: todo.memo ?? '',
    dueDate: todo.targetDate ? new Date(todo.targetDate) : null,
    assigneeId: todo.assigneeId,
    isRandom: todo.isRandom,
    repeatValue: toPrefilledRepeatValue({
      recurringType: todo.recurringType,
      repeatDays: todo.repeatDays,
      startDate: todo.startDate,
      endDate: todo.endDate,
    }),
  };

  const handleEdit = async (values: TodoFormValues) => {
    const payload = toCreateTodoPayload(values);

    try {
      await updateTodo({
        todoId: todo.todoId,
        payload,
      });

      toast('할 일이 수정되었어요.');
      navigate(-1);
    } catch {
      toast('할 일 수정에 실패했어요. 다시 시도해주세요.');
    }
  };

  const handleDelete = () => {
    // TODO: delete mutation 연결
    navigate(-1);
  };

  return (
    <TodoForm
      mode="edit"
      initialValues={initialValues}
      onSubmit={handleEdit}
      onDelete={handleDelete}
      isSubmitting={isPending}
    />
  );
};

export default TodoEditPage;
