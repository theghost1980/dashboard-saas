import { DonutChart } from '@/shared/ui/handcrafted/graphics/DonutChart';
import styles from './GlobalKpis.module.css';

type Props = {
  usersTotal: number;
  todosTotal: number;
  completionRate: number;
};

export function GlobalKpis({ usersTotal, todosTotal, completionRate }: Props) {
  return (
    <div className={styles.globalKpis}>
      <DonutChart
        label={'Usuarios'}
        value={usersTotal}
        delta={0.9}
        deltaLabel={`vs Mes pasado`}
      />
      <DonutChart
        label={'Todos'}
        value={todosTotal}
        delta={0.5}
        deltaLabel={`vs Ayer`}
      />
      <DonutChart
        label={'Completion Rate'}
        value={completionRate}
        delta={-0.4}
        deltaLabel={`vs Mes pasado`}
      />
    </div>
  );
}
