export type DataSource = 'jsonplaceholder' | 'dummyjson';

export type AsyncState<T> =
  | { status: 'idle'; data: T }
  | { status: 'loading'; data: T }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string; data: T };

export interface InternalUser {
  id: number;
  name: string;
  username: string;
  email: string;
  image?: string;
}

export interface InternalTodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface InternalCustomer {
  id: number;
  name: string;
  username: string;
  email: string;
  source: DataSource;
  activity: {
    todosTotal: number;
    todosPending: number;
    todosCompleted: number;
    todosCompletionRate: number;
  };
}

export interface Stats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

export interface UserStats {
  [userId: number]: Stats;
}

export type SortKey = 'name' | 'email' | 'username' | 'pending' | 'rate';
export type SortOrder = 'asc' | 'desc';

export interface Sort {
  key: SortKey;
  order: SortOrder;
}
