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
