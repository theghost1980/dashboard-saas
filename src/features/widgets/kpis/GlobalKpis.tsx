import { DonutChart } from '@/shared/ui/handcrafted/graphics/DonutChart';
import styles from './GlobalKpis.module.css';
import { BarChart, KpiCard } from '@derpdaderp/chartkit';
import { setCharKitTheme } from '@/shared/ui/chartkit/chatTheme';
import type { Theme } from '@/types/app';

type Props = {
  usersTotal: number;
  todosTotal: number;
  completionRate: number;
  theme: Theme;
};

const revenueData = [
  { value: 95000 },
  { value: 102000 },
  { value: 98000 },
  { value: 125000 },
];

const revenueData2 = [
  { value: 9500 },
  { value: 10200 },
  { value: 9800 },
  { value: 12500 },
];

export function GlobalKpis({
  usersTotal,
  todosTotal,
  completionRate,
  theme,
}: Props) {
  return (
    <div className={styles.globalKpis}>
      <div className={styles.globalKpis}>
        <KpiCard
          label="Usuarios"
          value={usersTotal}
          delta={12.5}
          data={revenueData}
          theme={setCharKitTheme(theme)}
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
      <div>
        <BarChart
          data={revenueData}
          theme={setCharKitTheme(theme)}
          orientation="vertical"
          showLabels
          barRadius={5}
          dataKey={'value'}
          categoryKey={'value'}
        />
        <div className={styles.globalKpis}>
          <KpiCard
            label="Revenue"
            value={12500}
            delta={12.5}
            data={revenueData2}
            theme={setCharKitTheme(theme)}
            format={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
        </div>
      </div>
    </div>
  );
}
