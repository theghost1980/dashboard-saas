import { config } from '@/shared/config/config';
import type {
  TodoDummyJSON,
  UsersDummyJSONResponse,
} from '@/types/datasource/dummyjson/rawdata';

const getUsers = async (
  abortSignal: AbortSignal,
): Promise<UsersDummyJSONResponse> => {
  const response = await fetch(config.endPoints.DummyJSON.users, {
    headers: {
      Accept: 'application/json',
    },
    signal: abortSignal,
  });
  if (!response.ok) throw new Error(`Dummyjson Api error: ${response.status}`);
  const data = (await response.json()) as UsersDummyJSONResponse;
  return data;
};

const getTodos = async (abortSignal: AbortSignal): Promise<TodoDummyJSON[]> => {
  const response = await fetch(config.endPoints.DummyJSON.todos, {
    headers: {
      Accept: 'application/json',
    },
    signal: abortSignal,
  });
  if (!response.ok) throw new Error(`Dummyjson Api error: ${response.status}`);
  const data = (await response.json()).todos as TodoDummyJSON[];
  return data;
};

export const DummyJSONApi = {
  getUsers,
  getTodos,
};
