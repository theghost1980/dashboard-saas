import { useMemo, useState } from 'react';
import { VirtualizedList } from '@/shared/ui/handcrafted/virtualized-list/VirtualizedList';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import type { AsyncState, DataSource, InternalUser } from '@/types/app';
import styles from './UserWidget.module.css';
import { StatusBar } from '@/shared/ui/handcrafted/status-bar/StatusBar';
import { ShimmerOverlay } from '@/shared/ui/handcrafted/shimmer/ShimmerOverlay';

interface Props {
  dataSource: DataSource;
  userState: AsyncState<InternalUser[]>;
  userRefetch: () => Promise<void>;
}

export function UserWidget({ dataSource, userRefetch, userState }: Props) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);
  const users = userState.data;

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
      <section>
        <StatusBar
          status={userState.status}
          errorMessage={userState.status === 'error' ? userState.error : ''}
          onRetry={userRefetch}
        />
      </section>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h2 className={styles.title}>Usuarios</h2>
          <span className={styles.badgeSmall}>{dataSource}</span>
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
        <div className={styles.actions}>
          <button
            className={styles.smallButton}
            onClick={() => void userRefetch()}
          >
            Actualizar
          </button>
        </div>
      </header>

      <ShimmerOverlay
        isLoading={userState.status === 'loading'}
        loadingText={'Cargando usuarios...'}
      >
        <VirtualizedList
          containerHeight={300}
          itemHeight={30}
          overscan={5}
          list={filteredUsers}
          getKey={(filteredUsers) => filteredUsers.id}
          renderItem={(u) => <p>{u.name}</p>}
        />
      </ShimmerOverlay>
    </div>
  );
}
