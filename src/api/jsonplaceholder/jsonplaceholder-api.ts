import { config } from '@/shared/config/config';
import type {
  TodoJSONPlaceholder,
  UserJSONPlaceholder,
} from '@/types/datasource/jsonplaceholder/rawdata';

const getUsers = async (
  abortSignal: AbortSignal,
): Promise<UserJSONPlaceholder[]> => {
  const response = await fetch(config.endPoints.JSONPlaceHolder.users, {
    headers: { Accept: 'application/json' },
    signal: abortSignal,
  });
  if (!response.ok)
    throw new Error(`JSONPlaceholder Api usuarios, error: ${response.status}`);
  const data = (await response.json()) as UserJSONPlaceholder[];
  return data;
};

const getTodos = async (
  abortSignal: AbortSignal,
): Promise<TodoJSONPlaceholder[]> => {
  const response = await fetch(config.endPoints.JSONPlaceHolder.todos, {
    headers: { Accept: 'application/json' },
    signal: abortSignal,
  });
  if (!response.ok)
    throw new Error(`JSONPlaceholder Api usuarios, error: ${response.status}`);
  const data = (await response.json()) as TodoJSONPlaceholder[];
  return data;
};

const getCitiesFromRawResponse = (
  rawResponseData: UserJSONPlaceholder[],
  count: number = 4,
) => {
  if (!rawResponseData)
    return ['Carora', 'Barquisimeto', 'Caracas', 'Maracaibo'];
  const tempSlice = rawResponseData.slice(0, count);
  return tempSlice.map((t) => t.address.city);
};

export const JSONPlaceholderApi = {
  getUsers,
  getTodos,
  getCitiesFromRawResponse,
};
