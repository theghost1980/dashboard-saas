import { JSONPlaceholderApi } from '@/api/jsonplaceholder/jsonplaceholder-api';
import type {
  AsyncState,
  InternalUser,
  UserDummyJSON,
  UserJSONPlaceholder,
} from '@/types/users';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AdapterUserUtils } from '../adapters/users';
import { DummyJSONApi } from '@/api/dummyjson/dummyjson-api';
import type { DataSource } from '@/types/app';

export function useUsers(dataSource: DataSource) {
  const [state, setState] = useState<AsyncState<InternalUser[]>>({
    status: 'idle',
  });
  const abortRef = useRef<AbortController | null>(null);

  const refetch = useCallback(async (): Promise<void> => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      setState({ status: 'loading' });
      let list: InternalUser[] = [];
      let rawUsers: UserJSONPlaceholder[] | UserDummyJSON[] = [];
      if (dataSource === 'jsonplaceholder') {
        rawUsers = await JSONPlaceholderApi.getUsers(abortRef.current.signal);
        list = rawUsers.map(AdapterUserUtils.mapJsonPlaceHolderUserToInternal);
      }
      if (dataSource === 'dummyjson') {
        rawUsers = (await DummyJSONApi.getUsers(abortRef.current.signal)).users;
        list = rawUsers.map(AdapterUserUtils.mapDummyJsonUserToInternal);
      }
      setState({ status: 'success', data: list });
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
