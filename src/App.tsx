import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import PageLoading from './components/PageLoading';

const Basic = lazy(() => import('./pages/basic/pages'));
const Pro = lazy(() => import('./pages/pro/pages'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Basic />} />
          <Route path="/pro" element={<Pro />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
