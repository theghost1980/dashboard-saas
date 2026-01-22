import type { InternalCustomer } from '@/types/app';

export type Column<T> = {
  key: string;
  header: string;
  width: string; // ej: "240px" o "1fr"
  cell: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
};

export const columns: Column<InternalCustomer>[] = [
  {
    key: 'name',
    header: 'Cliente',
    width: '2fr',
    cell: (c) => (
      <div>
        <div style={{ fontWeight: 600 }}>{c.name}</div>
        <div style={{ opacity: 0.75, fontSize: 12 }}>{c.email}</div>
      </div>
    ),
  },
  {
    key: 'username',
    header: 'Usuario',
    width: '1fr',
    cell: (c) => c.username,
  },
  { key: 'source', header: 'Source', width: '120px', cell: (c) => c.source },
  {
    key: 'pending',
    header: 'Pendientes',
    width: '110px',
    cell: (c) => c.activity.todosPending,
    align: 'right',
  },
  {
    key: 'rate',
    header: 'Completado %',
    width: '110px',
    cell: (c) => `${Math.round(c.activity.todosCompletionRate * 100)}%`,
    align: 'right',
  },
];
