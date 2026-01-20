import type { InternalTodo } from '@/types/app';
import type { TodoDummyJSON } from '@/types/datasource/dummyjson/rawdata';
import type { TodoJSONPlaceholder } from '@/types/datasource/jsonplaceholder/rawdata';

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
