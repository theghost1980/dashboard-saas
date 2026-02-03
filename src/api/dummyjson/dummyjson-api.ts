import { config } from '@/shared/config/config';
import type {
  TodoDummyJSON,
  UserDummyJSON,
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

const getCitiesFromRawResponse = (
  rawResponseData: UserDummyJSON[],
  count: number = 4,
) => {
  if (!rawResponseData)
    return ['Carora', 'Barquisimeto', 'Caracas', 'Maracaibo'];
  const tempSlice = rawResponseData.slice(0, count);
  return tempSlice.map((t) => t.address.city);
};

export const DummyJSONApi = {
  getUsers,
  getTodos,
  getCitiesFromRawResponse,
};
