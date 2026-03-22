import type { TodoFormValues, TodoWithLocal } from '@/types/todo';
import {
  createDefaultRepeatValue,
  toTodoRequestPayload,
} from '@/utils/todoForm';
import { useLocation, useNavigate } from 'react-router-dom';

import TodoForm from '@/pages/todos/components/TodoForm';

type LocationState = {
  todo?: TodoWithLocal;
};

const TodoEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const todo = (location.state as LocationState | undefined)?.todo;

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
    dueDate: todo.dueAt ? new Date(todo.dueAt) : null,
    assigneeId: todo.assigneeId,
    repeatValue: createDefaultRepeatValue(),
  };

  const handleEdit = (values: TodoFormValues) => {
    const submitData = toTodoRequestPayload(values);

    console.log('할 일 수정:', todo.id, submitData);

    navigate(-1);
  };

  const handleDelete = () => {
    console.log('할 일 삭제:', todo.id);
    navigate(-1);
  };

  return (
    <TodoForm
      mode="edit"
      initialValues={initialValues}
      onSubmit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default TodoEditPage;
