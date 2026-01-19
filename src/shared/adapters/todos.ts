import type {
  InternalTodo,
  TodoDummyJSON,
  TodoJSONPlaceholder,
} from '@/types/users';

const mapJsonPlaceholderTodoToInternal = (
  t: TodoJSONPlaceholder,
): InternalTodo => ({
  id: t.id,
  userId: t.userId,
  title: t.title,
  completed: t.completed,
});

/**
 *
 * nota: Solo renombra title -> t.todo
 * @link https://dummyjson.com/
 */
const mapDummyJsonTodoToInternal = (t: TodoDummyJSON): InternalTodo => ({
  id: t.id,
  userId: t.userId,
  title: t.todo,
  completed: t.completed,
});

export const AdapterTodoUtils = {
  mapJsonPlaceholderTodoToInternal,
  mapDummyJsonTodoToInternal,
};
