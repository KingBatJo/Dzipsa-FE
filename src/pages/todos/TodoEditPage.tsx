import type {
  DeleteRecurringTodoScope,
  TodoRecurringType,
} from '@/api/todo/todo.types';
import { toCreateTodoPayload, toPrefilledRepeatValue } from '@/utils/todoForm';
import {
  useDeleteRecurringTodoMutation,
  useUpdateTodoMutation,
} from '@/api/todo/todo.query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import TodoForm from '@/pages/todos/components/TodoForm';
import type { TodoFormValues } from '@/types/todo';
import { getApiErrorMessage } from '@/api/error';
import { toast } from 'sonner';

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
  const { todoId: instanceIdParam } = useParams();

  const { mutateAsync: updateTodo, isPending } = useUpdateTodoMutation();
  const { mutate: deleteRecurringTodo, isPending: isDeleting } =
    useDeleteRecurringTodoMutation();

  const todo = location.state as EditTodoLocationState | undefined;
  const instanceId = Number(instanceIdParam);

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
      const title = values.title?.trim();

      toast(
        title ? `[${title}] 할 일이 수정되었어요.` : '할 일이 수정되었어요.'
      );
      navigate(-1);
    } catch (error) {
      toast(
        getApiErrorMessage(error) ??
          '할 일 수정에 실패했어요. 다시 시도해주세요.'
      );
    }
  };

  const handleDelete = (scope: DeleteRecurringTodoScope = 'ONLY_THIS') => {
    if (!Number.isFinite(instanceId) || instanceId <= 0) {
      toast('삭제할 할 일 정보를 확인할 수 없어요.');
      return;
    }

    deleteRecurringTodo(
      { instanceId, scope },
      {
        onSuccess: () => {
          const title = todo.title?.trim();

          toast(
            title ? `[${title}] 할 일이 삭제되었어요.` : '할 일이 삭제되었어요.'
          );
          navigate('/todos');
        },
        onError: () => {
          toast('할 일 삭제에 실패했어요. 다시 시도해주세요.');
        },
      }
    );
  };

  return (
    <TodoForm
      mode="edit"
      initialValues={initialValues}
      onSubmit={handleEdit}
      onDelete={handleDelete}
      isRecurringTodo={todo.recurringType !== 'NONE'}
      isSubmitting={isPending || isDeleting}
    />
  );
};

export default TodoEditPage;
