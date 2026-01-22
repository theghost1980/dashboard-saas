import { useMemo, useState, useTransition } from 'react';
import styles from './CustomerPage.module.css';
import type {
  DataSource,
  InternalCustomer,
  Sort,
  SortKey,
  Stats,
  UserStats,
} from '@/types/app';
import { useUsers } from '@/shared/hooks/useUsers';
import { useTodos } from '@/shared/hooks/useTodos';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { EasyTableVirtualized } from '@/shared/ui/handcrafted/table/EasyTableVirtualized';
import { Switch } from '@/shared/ui/handcrafted/switch/Switch';
import { EasyTableSimple } from '@/shared/ui/handcrafted/table/EasyTableSimple';
import { getCustomerValue } from '@/shared/utils/utils';

interface Props {
  dataSource: DataSource;
}

export function CustomersPage({ dataSource }: Props) {
  const [query, setQuery] = useState('');
  const [virtualizationUI, setVirtualizationUI] = useState(true);
  const [virtualizationApplied, setVirtualizationApplied] = useState(true);
  const [sort, setSort] = useState<Sort>({
    key: 'name',
    order: 'asc',
  });

  const [isPending, startTransition] = useTransition();

  const users = useUsers(dataSource);
  const todos = useTodos(dataSource);
  const debouncedQuery = useDebouncedValue(query, 300);

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
  }, [users.state.data, todos.state.data, dataSource]);

  const filteredCustomers = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return customerData;

    return customerData.filter((c) => {
      const n = c.name.toLowerCase();
      const u = c.username.toLowerCase();
      const e = c.email.toLowerCase();
      return n.includes(q) || e.includes(q) || u.includes(q);
    });
  }, [customerData, debouncedQuery]);

  const sortedCustomers = useMemo(() => {
    const copyFilteredCustomers = [...filteredCustomers];
    const k = sort.key;
    const o = sort.order;
    if (k === 'name' || k === 'email' || k === 'username') {
      copyFilteredCustomers.sort((a: InternalCustomer, b: InternalCustomer) => {
        const va = getCustomerValue.getStringValue(a, k);
        const vb = getCustomerValue.getStringValue(b, k);
        if (o === 'asc') {
          return va.localeCompare(vb);
        } else {
          return vb.localeCompare(va);
        }
      });
    } else if (k === 'pending' || k === 'rate') {
      copyFilteredCustomers.sort((a: InternalCustomer, b: InternalCustomer) => {
        const va = getCustomerValue.getNumberValue(a, k);
        const vb = getCustomerValue.getNumberValue(b, k);
        if (o === 'asc') {
          return va - vb;
        } else {
          return vb - va;
        }
      });
    }
    return copyFilteredCustomers;
  }, [filteredCustomers, sort.key, sort.order]);

  const onToggleVirtualization = (nextChecked: boolean) => {
    setVirtualizationUI(nextChecked);
    startTransition(() => {
      setVirtualizationApplied(nextChecked);
    });
  };

  const handleSetSort = (key: SortKey) => {
    const k = key;
    let prevOrder = sort.order;
    if (prevOrder === 'asc') prevOrder = 'desc';
    else prevOrder = 'asc';
    setSort({ key: k, order: prevOrder });
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
          customers={sortedCustomers}
          virtualize={virtualizationApplied}
          resetKey={debouncedQuery}
          onSort={(k) => handleSetSort(k)}
          sort={sort}
        />
      ) : (
        <EasyTableSimple customers={sortedCustomers} />
      )}
    </div>
  );
}
