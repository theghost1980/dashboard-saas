import { NotFoundPage } from '@/pages/404/NotFoundPage';
import { CustomersPage } from '@/pages/customers/CustomersPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { DocsPage } from '@/pages/docs/DocsPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { AppShell } from '@/shared/layouts/app-shell/AppShell';
import { BrowserRouter, Route, Routes } from 'react-router';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell title="Dashboard" />}>
          <Route index element={<DashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
