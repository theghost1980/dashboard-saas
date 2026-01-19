import { useMemo, useState } from 'react';
import { VirtualizedList } from '@/shared/ui/handcrafted/virtualized-list/VirtualizedList';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import type { DataSource } from '@/types/app';
import styles from './UserList.module.css';
import type { AsyncState, InternalUser } from '@/types/users';

interface Props {
  dataSource: DataSource;
  userState: AsyncState<InternalUser[]>;
  userRefetch: () => Promise<void>;
}

export function UserList({ dataSource, userRefetch, userState }: Props) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);
  const users = userState.status === 'success' ? userState.data : [];

  const filteredUsers = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return users;

    return users.filter((user) => {
      const u = user.name.toLowerCase();
      const e = user.email.toLowerCase();
      return u.includes(q) || e.includes(q);
    });
  }, [users, debouncedQuery]);

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div>
          <div className={styles.headerTitle}>
            <h2 className={styles.title}>Usuarios</h2>
            <span className={styles.badgeSmall}>{dataSource}</span>
          </div>
        </div>
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
      </header>
      <ul>
        {userState.status === 'loading' && <li>Cargando datos...</li>}
        {userState.status === 'error' && (
          <li>
            {userState.error}
            <button onClick={() => void userRefetch()}>Reintentar</button>
          </li>
        )}
        {userState.status === 'success' && (
          <VirtualizedList
            containerHeight={300}
            itemHeight={30}
            overscan={5}
            list={filteredUsers}
            getKey={(filteredUsers) => filteredUsers.id}
            renderItem={(u) => <p>{u.name}</p>}
          />
        )}
      </ul>
    </div>
  );
}
