import { useCallback, useEffect, useRef, useState } from 'react';
import { JSONPlaceholderApi } from '@/api/jsonplaceholder/jsonplaceholder-api';
import { AdapterTodoUtils } from '../adapters/todos';
import { DummyJSONApi } from '@/api/dummyjson/dummyjson-api';
import type { AsyncState, DataSource, InternalTodo } from '@/types/app';
import type { TodoJSONPlaceholder } from '@/types/datasource/jsonplaceholder/rawdata';
import type { TodoDummyJSON } from '@/types/datasource/dummyjson/rawdata';

export function useTodos(dataSource: DataSource) {
  const [state, setState] = useState<AsyncState<InternalTodo[]>>({
    status: 'idle',
    data: [],
  });
  const abortRef = useRef<AbortController | null>(null);
  const lastDataRef = useRef<InternalTodo[]>([]);

  const refetch = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((prev) => {
      lastDataRef.current = prev.data;
      return { status: 'loading', data: prev.data };
    });

    try {
      let rawTodos: TodoJSONPlaceholder[] | TodoDummyJSON[] = [];
      let todos: InternalTodo[] = [];
      if (dataSource === 'jsonplaceholder') {
        rawTodos = await JSONPlaceholderApi.getTodos(abortRef.current.signal);
        todos = rawTodos.map(AdapterTodoUtils.mapJsonPlaceholderTodoToInternal);
      } else if (dataSource === 'dummyjson') {
        rawTodos = await DummyJSONApi.getTodos(abortRef.current.signal);
        todos = rawTodos.map(AdapterTodoUtils.mapDummyJsonTodoToInternal);
      }
      lastDataRef.current = todos;
      setState({ status: 'success', data: todos });
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      const message =
        error instanceof Error ? error.message : 'Error desconocido';

      setState({ status: 'error', error: message, data: lastDataRef.current });
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
