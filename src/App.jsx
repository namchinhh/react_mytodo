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
import GuestRoute from './components/GuestRoute';
import Login from './pages/Login';
import Register from './pages/Register';

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
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          <Route path="/statistics" element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
