import './App.css';
import { lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import Settings from './pages/Settings';
const Statistics = lazy(() => import('./pages/Statistics'));

function App() {


  return (
    <main className="app">
      <nav>
        <Link to="/">Todo</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
