import type { DataSource } from '@/types/app';
import { useState } from 'react';
import { AppRouter } from './router/AppRouter';

function App() {
  const [dataSource, setDataSource] = useState<DataSource>('jsonplaceholder');
  return (
    <AppRouter dataSource={dataSource} onDataSourceChange={setDataSource} />
  );
}

export default App;
