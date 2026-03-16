import TodoForm from '@/pages/todos/components/TodoForm';
import type { TodoFormValues } from '@/types/todo';
import { toTodoCreateRequest } from '@/utils/todoForm';

const ROOM_ID = 1; // 임시값

const TodoCreatePage = () => {
  const handleCreate = (values: TodoFormValues) => {
    const submitData = toTodoCreateRequest(values, ROOM_ID);

    console.log('할 일 등록:', submitData);
  };

  return <TodoForm mode="create" onSubmit={handleCreate} />;
};

export default TodoCreatePage;
