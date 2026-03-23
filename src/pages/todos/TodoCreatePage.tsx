import TodoForm from '@/pages/todos/components/TodoForm';
import type { TodoFormValues } from '@/types/todo';
import { toCreateTodoPayload } from '@/utils/todoForm';
import { toast } from 'sonner';
import { useCreateTodoMutation } from '@/api/todo/todo.query';
import { useNavigate } from 'react-router-dom';

const TodoCreatePage = () => {
  const navigate = useNavigate();
  const { mutate: createTodo, isPending } = useCreateTodoMutation();

  const handleCreate = (values: TodoFormValues) => {
    const payload = toCreateTodoPayload(values);

    createTodo(payload, {
      onSuccess: () => {
        toast('할 일이 등록되었어요.');
        navigate('/todos/my');
      },
      onError: () => {
        toast('할 일 등록에 실패했어요. 다시 시도해주세요.');
      },
    });
  };

  return (
    <TodoForm mode="create" onSubmit={handleCreate} isSubmitting={isPending} />
  );
};

export default TodoCreatePage;
