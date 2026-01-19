import type {
  AsyncState,
  InternalTodo,
  TodoDummyJSON,
  TodoJSONPlaceholder,
} from '@/types/users';
import { useCallback, useEffect, useRef, useState } from 'react';
import { JSONPlaceholderApi } from '@/api/jsonplaceholder/jsonplaceholder-api';
import { AdapterTodoUtils } from '../adapters/todos';
import { DummyJSONApi } from '@/api/dummyjson/dummyjson-api';
import type { DataSource } from '@/types/app';

export function useTodos(dataSource: DataSource) {
  const [state, setState] = useState<AsyncState<InternalTodo[]>>({
    status: 'idle',
  });
  const abortRef = useRef<AbortController | null>(null);

  const refetch = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setState({ status: 'loading' });
      let rawTodos: TodoJSONPlaceholder[] | TodoDummyJSON[] = [];
      let todos: InternalTodo[] = [];
      if (dataSource === 'jsonplaceholder') {
        rawTodos = await JSONPlaceholderApi.getTodos(abortRef.current.signal);
        todos = rawTodos.map(AdapterTodoUtils.mapJsonPlaceholderTodoToInternal);
      } else if (dataSource === 'dummyjson') {
        rawTodos = await DummyJSONApi.getTodos(abortRef.current.signal);
        todos = rawTodos.map(AdapterTodoUtils.mapDummyJsonTodoToInternal);
      }
      setState({ status: 'success', data: todos! });
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      const message =
        error instanceof Error ? error.message : 'Error desconocido';
      if (!abortRef.current) return;
      setState({ status: 'error', error: message });
    }
  }, [dataSource]);

  useEffect(() => {
    void refetch();
    return () => {
      abortRef.current?.abort();
    };
  }, [refetch]);

  return { state, refetch };
}
