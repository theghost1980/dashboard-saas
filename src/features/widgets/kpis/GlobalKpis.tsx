import styles from './GlobalKpis.module.css';
import { DonutChart, KpiCard } from '@derpdaderp/chartkit';
import { setCharKitTheme } from '@/shared/ui/chartkit/chatTheme';
import type { Theme } from '@/types/app';
import {
  donusChartData,
  revenueData,
  revenueData2,
} from '@/shared/config/config';
import { overrideMinStyles } from '@/shared/config/styles';

type Props = {
  usersTotal: number;
  todosTotal: number;
  completionRate: number;
  theme: Theme;
};

export function GlobalKpis({
  usersTotal,
  todosTotal,
  completionRate,
  theme,
}: Props) {
  return (
    <div className={styles.globalKpis}>
      <div className="chartWrapper">
        <KpiCard
          label="Usuarios"
          value={usersTotal}
          delta={12.5}
          data={revenueData}
          theme={setCharKitTheme(theme)}
          style={overrideMinStyles}
        />
      </div>
      <div className="chartWrapper">
        <KpiCard
          label="Todos"
          value={todosTotal}
          delta={40}
          data={revenueData2}
          theme={setCharKitTheme(theme)}
          format={(v) => `${v * 100}`}
          style={overrideMinStyles}
        />
      </div>
      <div className="chartWrapper">
        <KpiCard
          label="Completion Rate"
          value={completionRate}
          delta={-40}
          data={revenueData2}
          theme={setCharKitTheme(theme)}
          format={(v) => `${v * 100}%`}
          style={overrideMinStyles}
        />
      </div>
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
        style={overrideMinStyles}
      />
    </div>
  );
}
