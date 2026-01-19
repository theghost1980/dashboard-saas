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
      <DonutChart label={'Usuarios'} value={usersTotal} />
      <DonutChart label={'Todos'} value={todosTotal} />
      <DonutChart label={'Completion Rate'} value={completionRate} />
    </div>
  );
}
