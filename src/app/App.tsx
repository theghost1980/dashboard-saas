import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import type { DataSource } from '@/types/users';
import { useState } from 'react';

function App() {
  const [dataSource, setDataSource] = useState<DataSource>('jsonplaceholder');
  return (
    <DashboardPage dataSource={dataSource} onDataSourceChange={setDataSource} />
  );
}

export default App;
