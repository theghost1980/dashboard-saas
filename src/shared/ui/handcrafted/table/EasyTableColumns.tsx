import type { InternalCustomer, SortKey } from '@/types/app';

export type Column<T> = {
  key: string;
  header: string;
  width: string;
  priority: 0 | 1 | 2;
  cell: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  sortKey?: SortKey;
};

export const columns: Column<InternalCustomer>[] = [
  {
    key: 'name',
    header: 'Cliente',
    width: '2fr',
    priority: 0,
    cell: (c) => (
      <div>
        <div style={{ fontWeight: 600 }}>{c.name}</div>
        <div style={{ opacity: 0.75, fontSize: 12 }}>{c.email}</div>
      </div>
    ),
    sortKey: 'name',
  },
  {
    key: 'username',
    header: 'Usuario',
    width: '1fr',
    priority: 1,
    cell: (c) => c.username,
    sortKey: 'username',
  },
  {
    key: 'source',
    header: 'Source',
    width: '120px',
    priority: 2,
    cell: (c) => c.source,
  },
  {
    key: 'pending',
    header: 'Pendientes',
    width: '110px',
    priority: 0,
    cell: (c) => c.activity.todosPending,
    align: 'right',
    sortKey: 'pending',
  },
  {
    key: 'rate',
    header: 'Completado %',
    width: '110px',
    priority: 0,
    cell: (c) => `${Math.round(c.activity.todosCompletionRate * 100)}%`,
    align: 'right',
    sortKey: 'rate',
  },
];
