import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Statistics from './components/WeatherTable.tsx';
import { errorElement } from './components/Error.tsx';
import NotFound from './components/NotFound.tsx';
import LoginForm from './components/LoginForm'; // Імпортуємо компонент логіна
import ProtectedRoute from './components/ProtectedRoute'; // Імпортуємо ProtectedRoute
import './styles/output.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />
  },
  {
    path: '/statistics',
    element: (
      <ProtectedRoute>
        <Statistics />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginForm />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
