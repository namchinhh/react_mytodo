import './App.css';
import { lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import Settings from './pages/Settings';
import TaskDetails from './pages/TaskDetails';
import ProtectedRoute from './components/ProtectedRoute';
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
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
