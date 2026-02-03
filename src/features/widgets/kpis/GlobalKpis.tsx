import styles from './GlobalKpis.module.css';
import { DonutChart, KpiCard } from '@derpdaderp/chartkit';
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

const donusChartData = [
  { category: 'Desktop', value: 65 },
  { category: 'Mobile', value: 30 },
  { category: 'Tablet', value: 5 },
];

export function GlobalKpis({
  usersTotal,
  todosTotal,
  completionRate,
  theme,
}: Props) {
  return (
    <div className={styles.globalKpis}>
      <KpiCard
        label="Usuarios"
        value={usersTotal}
        delta={12.5}
        data={revenueData}
        theme={setCharKitTheme(theme)}
      />
      <KpiCard
        label="Todos"
        value={todosTotal}
        delta={40}
        data={revenueData2}
        theme={setCharKitTheme(theme)}
        format={(v) => `${v * 100}`}
      />
      <KpiCard
        label="Completion Rate"
        value={completionRate}
        delta={-40}
        data={revenueData2}
        theme={setCharKitTheme(theme)}
        format={(v) => `${v * 100}%`}
      />
      <DonutChart
        data={donusChartData}
        theme={setCharKitTheme(theme)}
        size={220}
        innerRadius={0.6}
        showLegend
        legendPosition="right"
        padAngle={2}
        dataKey={'value'}
        labelKey={'category'}
      />
    </div>
  );
}
