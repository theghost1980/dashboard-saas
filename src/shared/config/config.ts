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

export const revenueData = [
  { value: 95000 },
  { value: 102000 },
  { value: 98000 },
  { value: 125000 },
];

export const revenueData2 = [
  { value: 9500 },
  { value: 10200 },
  { value: 9800 },
  { value: 12500 },
];

export const donusChartData = [
  { category: 'Desktop', value: 65 },
  { category: 'Mobile', value: 30 },
  { category: 'Tablet', value: 5 },
];

export const mobileBP = {
  '700px': 700,
};
