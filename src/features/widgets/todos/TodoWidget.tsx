import { VirtualizedList } from '@/shared/ui/handcrafted/virtualized-list/VirtualizedList';
import { useMemo } from 'react';
import styles from './TodoWidget.module.css';
import type { DataSource } from '@/types/app';
import type { AsyncState, InternalTodo } from '@/types/users';

interface Props {
  dataSource: DataSource;
  todoState: AsyncState<InternalTodo[]>;
  todoRefetch: () => Promise<void>;
}

export function TodoWidget({ dataSource, todoRefetch, todoState }: Props) {
  const todos = todoState.status === 'success' ? todoState.data : [];

  const kpis = useMemo(() => {
    const total = todos.length;
    const completed = todos.reduce(
      (acc, todo) => acc + (todo.completed ? 1 : 0),
      0,
    );
    const pending = total - completed;
    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, completionRate };
  }, [todos]);

  return (
    <div>
      {todoState.status === 'loading' && <p>Cargando datos...</p>}
      {todoState.status === 'error' && (
        <p>
          {todoState.error}
          <button onClick={() => void todoRefetch()}>Reintentar</button>
        </p>
      )}
      {todoState.status === 'success' && todos.length === 0 && (
        <p>No hay todos.</p>
      )}
      {todoState.status === 'success' && (
        <div className={styles.card}>
          <header className={styles.header}>
            <div>
              <div className={styles.headerTitle}>
                <h2 className={styles.title}>Todos</h2>
                <span className={styles.badgeSmall}>{dataSource}</span>
              </div>
              <p className={styles.subtitle}>Resumen + lista</p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.smallButton}
                onClick={() => void todoRefetch()}
              >
                Actualizar
              </button>
            </div>
          </header>
          <section className={styles.kpis}>
            <div className={styles.kpiCard}>
              <div className={styles.kpiLabel}>Total</div>
              <div className={styles.kpiValue}>{kpis.total}</div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiLabel}>Completados</div>
              <div className={styles.kpiValue}>{kpis.completed}</div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiLabel}>Pendientes</div>
              <div className={styles.kpiValue}>{kpis.pending}</div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiLabel}>% completado</div>
              <div className={styles.kpiValue}>{kpis.completionRate}%</div>
            </div>
          </section>
          <div className={styles.chart}>
            <div className={styles.chartTitle}>
              <div className={styles.chartLabel}>Progreso</div>
              <div className={styles.chartValue}>
                {kpis.completionRate}% completado
              </div>
            </div>
            <div className={styles.bar}>
              <div
                className={styles.fill}
                style={{ width: `${kpis.completionRate}%` }}
              />
            </div>
          </div>
          <section className={styles.body}>
            <VirtualizedList
              containerHeight={250}
              itemHeight={30}
              overscan={5}
              list={todos}
              getKey={(t) => t.id}
              renderItem={(item) => (
                <p>
                  {item.title} {item.completed && '✔'}
                </p>
              )}
            />
          </section>
        </div>
      )}
    </div>
  );
}
