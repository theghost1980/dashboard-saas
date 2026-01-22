import type { AppSettings } from '@/types/app';

export const config = {
  endPoints: {
    JSONPlaceHolder: {
      users: 'https://jsonplaceholder.typicode.com/users',
      todos: 'https://jsonplaceholder.typicode.com/todos',
    },
    DummyJSON: {
      users: 'https://dummyjson.com/users',
      todos: 'https://dummyjson.com/todos',
    },
  },
};

export const DEFAULT_SETTINGS: AppSettings = {
  virtualization: true,
  theme: 'light',
  motion: 'system',
  dataSource: 'jsonplaceholder',
};
