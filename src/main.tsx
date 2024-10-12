import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Statistics from './components/WeatherTable.tsx'
import { errorElement } from './components/Error.tsx'
import NotFound from './components/NotFound.tsx'
import './styles/output.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: '/statistics',
    element: <Statistics />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  
  </StrictMode>,
)
