import { useCallback, useMemo, useState } from 'react';
import styles from './CustomerPage.module.css';
import type {
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
import { EasyTableSimple } from '@/shared/ui/handcrafted/table/EasyTableSimple';
import { getCustomerValue } from '@/shared/utils/utils';
import { useSettings } from '@/app/context/hooks/useSettings';
import { DonutChart } from '@derpdaderp/chartkit';
import { setCharKitTheme } from '@/shared/ui/chartkit/chatTheme';

export function CustomersPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>({
    key: 'name',
    order: 'asc',
  });

  const { settings } = useSettings();
  const users = useUsers(settings.dataSource);
  const todos = useTodos(settings.dataSource);
  const debouncedQuery = useDebouncedValue(query, 300);

  const customerData = useMemo(() => {
    if (users.state.status !== 'success' || todos.state.status !== 'success') {
      return [];
    }
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
        source: settings.dataSource,
        city: user.city,
        activity: {
          todosTotal: stats.total,
          todosPending: stats.pending,
          todosCompleted: stats.completed,
          todosCompletionRate: completionRate,
        },
      };
    });
    return finalUsersStats;
  }, [
    users.state.data,
    todos.state.data,
    settings.dataSource,
    users.state.status,
    todos.state.status,
  ]);

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
    if (filteredCustomers.length <= 1) return filteredCustomers;

    const { key, order } = sort;
    const dir = order === 'asc' ? 1 : -1;

    const decorated = filteredCustomers.map((item, index) => ({ item, index }));

    decorated.sort((a, b) => {
      const va = getCustomerValue.getSortValue(a.item, key);
      const vb = getCustomerValue.getSortValue(b.item, key);

      let cmp =
        typeof va === 'number' && typeof vb === 'number'
          ? va - vb
          : String(va).localeCompare(String(vb));

      if (cmp === 0) cmp = a.index - b.index;
      return cmp * dir;
    });

    return decorated.map((x) => x.item);
  }, [filteredCustomers, sort.key, sort.order]);

  const handleSetSort = useCallback((key: SortKey) => {
    setSort((prev) => ({
      key,
      order: prev.order === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of filteredCustomers) {
      counts[c.city] = (counts[c.city] ?? 0) + 1;
    }
    return users.state.cities.map((c) => ({
      city: c,
      value: counts[c] ?? 0,
    }));
  }, [filteredCustomers, users.state.cities]);

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
            placeholder="Nombre, usuario o email"
          />
        </section>
        <section>
          <div className={styles.virtualizationStatus}>
            {sortedCustomers.length} clientes • tabla Virtualizada{' '}
            <div className={styles.statusIndicator}>
              <span
                className={settings.virtualization ? styles.on : styles.off}
              >
                {settings.virtualization ? 'on ▲' : 'off ▼'}
              </span>
            </div>
          </div>
        </section>
      </div>

      {!query && (
        <section className={styles.midSectionGraphs}>
          <h3 className={styles.titleSection}>Ciudades Principales</h3>
          <DonutChart
            data={cityCounts}
            theme={setCharKitTheme(settings.theme)}
            size={220}
            innerRadius={0}
            showLegend
            legendPosition="right"
            padAngle={4}
            dataKey={'value'}
            labelKey={'city'}
          />
        </section>
      )}

      {settings.virtualization ? (
        <EasyTableVirtualized
          customers={sortedCustomers}
          virtualize={settings.virtualization}
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
