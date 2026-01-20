import { NotFoundPage } from '@/pages/404/NotFoundPage';
import { CustomersPage } from '@/pages/customers/CustomersPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { navItenms } from '@/shared/config/navitems';
import { AppShell } from '@/shared/layouts/app-shell/AppShell';
import type { DataSource } from '@/types/app';
import { BrowserRouter, Route, Routes } from 'react-router';

interface Props {
  dataSource: DataSource;
  onDataSourceChange: (dataSource: DataSource) => void;
}

export function AppRouter({ dataSource, onDataSourceChange }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppShell
              title="Dashboard"
              navItems={navItenms}
              dataSource={dataSource}
              onDataSourceChange={onDataSourceChange}
            />
          }
        >
          <Route index element={<DashboardPage dataSource={dataSource} />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
