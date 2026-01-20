import { JSONPlaceholderApi } from '@/api/jsonplaceholder/jsonplaceholder-api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AdapterUserUtils } from '../adapters/users';
import { DummyJSONApi } from '@/api/dummyjson/dummyjson-api';
import type { AsyncState, DataSource, InternalUser } from '@/types/app';
import type { UserJSONPlaceholder } from '@/types/datasource/jsonplaceholder/rawdata';
import type { UserDummyJSON } from '@/types/datasource/dummyjson/rawdata';
import { ApiUtils } from '@/api/utils';

export function useUsers(dataSource: DataSource) {
  const [state, setState] = useState<AsyncState<InternalUser[]>>({
    status: 'idle',
    data: [],
  });
  const abortRef = useRef<AbortController | null>(null);
  const lastDataRef = useRef<InternalUser[]>([]);

  const refetch = useCallback(async (): Promise<void> => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setState((prev) => {
      lastDataRef.current = prev.data;
      return { status: 'loading', data: prev.data };
    });

    try {
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
      list = ApiUtils.expandUsers(list);
      lastDataRef.current = list;
      setState({ status: 'success', data: list });
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
