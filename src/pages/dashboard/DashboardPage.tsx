import { TodoWidget } from '@/features/widgets/todos/TodoWidget';
import type { DataSource, InternalTodo } from '@/types/app';
import styles from './DashboardPage.module.css';
import { GlobalKpis } from '@/features/widgets/kpis/GlobalKpis';
import { useUsers } from '@/shared/hooks/useUsers';
import { useTodos } from '@/shared/hooks/useTodos';
import { useMemo } from 'react';
import { UserWidget } from '@/features/widgets/users/UserWidget';

interface Props {
  dataSource: DataSource;
}

export function DashboardPage({ dataSource }: Props) {
  const userQuery = useUsers(dataSource);
  const todosQuery = useTodos(dataSource);

  const kpisUsers = useMemo(() => {
    if (userQuery.state.status !== 'success') {
      return { totalUsersP: 0 };
    }
    return {
      totalUsersP: userQuery.state.data.length / 100,
    };
  }, [userQuery.state.status]);

  const kpisTodos = useMemo(() => {
    if (todosQuery.state.status !== 'success') {
      return { totalP: 0, completed: 0, pending: 0, completionRateP: 0 };
    }

    const todos = todosQuery.state.data;
    const total = todos.length;
    const completed = todos.reduce(
      (acc: number, t: InternalTodo) => acc + (t.completed ? 1 : 0),
      0,
    );
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
          <UserWidget
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
  );
}
