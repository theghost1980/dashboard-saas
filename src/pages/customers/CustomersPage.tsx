import { useMemo, useState, useTransition } from 'react';
import styles from './CustomerPage.module.css';
import type {
  DataSource,
  InternalCustomer,
  Stats,
  UserStats,
} from '@/types/app';
import { useUsers } from '@/shared/hooks/useUsers';
import { useTodos } from '@/shared/hooks/useTodos';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { EasyTableVirtualized } from '@/shared/ui/handcrafted/table/EasyTableVirtualized';
import { Switch } from '@/shared/ui/handcrafted/switch/Switch';
import { EasyTableSimple } from '@/shared/ui/handcrafted/table/EasyTableSimple';

interface Props {
  dataSource: DataSource;
}

export function CustomersPage({ dataSource }: Props) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);

  const [virtualizationUI, setVirtualizationUI] = useState(true);
  const [virtualizationApplied, setVirtualizationApplied] = useState(true);

  const [isPending, startTransition] = useTransition();

  const users = useUsers(dataSource);
  const todos = useTodos(dataSource);

  const customerData = useMemo(() => {
    let userTodos: UserStats = {};
    const userTodoDefault: Stats = {
      total: 0,
      completed: 0,
      pending: 0,
      completionRate: 0,
    };
    for (const todo of todos.state.data) {
      const id = todo.userId;
      if (!userTodos[id]) userTodos[id] = { ...userTodoDefault };

      userTodos[id].total += 1;
      userTodos[id].completed += todo.completed ? 1 : 0;
      userTodos[id].pending += !todo.completed ? 1 : 0;
    }

    const finalUsersStats: InternalCustomer[] = users.state.data.map((user) => {
      const stats = userTodos[user.id] ?? { ...userTodoDefault };
      const completionRate =
        stats.total === 0 ? 0 : stats.completed / stats.total;
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        source: dataSource,
        activity: {
          todosTotal: stats.total,
          todosPending: stats.pending,
          todosCompleted: stats.completed,
          todosCompletionRate: completionRate,
        },
      };
    });
    return finalUsersStats;
  }, [users.state.data, todos.state.data]);

  const filteredCostumers = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return customerData;

    return customerData.filter((c) => {
      const n = c.name.toLowerCase();
      const e = c.email.toLowerCase();
      return n.includes(q) || e.includes(q);
    });
  }, [customerData, debouncedQuery]);

  const onToggleVirtualization = (nextChecked: boolean) => {
    setVirtualizationUI(nextChecked);
    startTransition(() => {
      setVirtualizationApplied(nextChecked);
    });
  };

  return (
    <div className={styles.customersPage}>
      <div className={styles.topContainer}>
        <section className={styles.searchBox}>
          <label className={styles.label} htmlFor="query-input">
            Buscar:
          </label>
          <input
            className={styles.input}
            id="query-input"
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
        </section>
        <section>
          <Switch
            checked={virtualizationUI}
            onChange={onToggleVirtualization}
            label="Virtualización"
            labels={{ on: 'ON', off: 'OFF' }}
            disabled={isPending}
          />
        </section>
      </div>

      {virtualizationApplied ? (
        <EasyTableVirtualized
          customers={filteredCostumers}
          virtualize={virtualizationApplied}
        />
      ) : (
        <EasyTableSimple customers={filteredCostumers} />
      )}
    </div>
  );
}
