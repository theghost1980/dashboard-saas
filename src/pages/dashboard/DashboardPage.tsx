import { UserList } from '@/features/users/UserList';
import { TodoWidget } from '@/features/widgets/todos/TodoWidget';
import { AppShell } from '@/shared/layouts/app-shell/AppShell';
import type { DataSource } from '@/types/app';
import styles from './DashboardPage.module.css';
import { GlobalKpis } from '@/features/widgets/kpis/GlobalKpis';
import { useUsers } from '@/shared/hooks/useUsers';
import { useTodos } from '@/shared/hooks/useTodos';
import { useMemo } from 'react';

interface Props {
  dataSource: DataSource;
  onDataSourceChange: (dataSource: DataSource) => void;
}

export function DashboardPage({ dataSource, onDataSourceChange }: Props) {
  const userQuery = useUsers(dataSource);
  const todosQuery = useTodos(dataSource);

  const kpisUsers = useMemo(() => {
    if (userQuery.state.status !== 'success') {
      return { totalUsersP: 0 };
    }

    const totalUsers =
      userQuery.state.data.length > 0 ? userQuery.state.data.length : 0;
    return {
      totalUsersP: totalUsers / 100,
    };
  }, [userQuery.state]);

  const kpisTodos = useMemo(() => {
    if (todosQuery.state.status !== 'success') {
      return { totalP: 0, completed: 0, pending: 0, completionRateP: 0 };
    }

    const todos = todosQuery.state.data;
    const total = todos.length;
    const completed = todos.reduce((acc, t) => acc + (t.completed ? 1 : 0), 0);
    const pending = total - completed;
    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      totalP: total / 100,
      completed,
      pending,
      completionRateP: completionRate / 100,
    };
  }, [todosQuery.state]);

  return (
    <AppShell
      title="Dashboard"
      navItems={[
        { label: 'Dashboard', href: '#one', isActive: true },
        { label: 'Customers', href: '#two' },
        { label: 'Settings', href: '#three' },
      ]}
      dataSource={dataSource}
      onDataSourceChange={onDataSourceChange}
    >
      <div className={styles.dashboard}>
        <section className={styles.globalSection}>
          <GlobalKpis
            usersTotal={kpisUsers.totalUsersP}
            todosTotal={kpisTodos.totalP}
            completionRate={kpisTodos.completionRateP}
          />
        </section>
        <section className={styles.grid}>
          <section className={styles.colLeft}>
            <UserList
              dataSource={dataSource}
              userState={userQuery.state}
              userRefetch={userQuery.refetch}
            />
          </section>
          <section className={styles.colRight}>
            <TodoWidget
              dataSource={dataSource}
              todoRefetch={todosQuery.refetch}
              todoState={todosQuery.state}
            />
          </section>
        </section>
      </div>
    </AppShell>
  );
}
