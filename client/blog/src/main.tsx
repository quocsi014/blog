import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import DashBoard from '@/layouts/dashboard-layout';
import AppLayout from '@/layouts/app-layout';
import User from '@/pages/dashboard/user';
import Post from '@/pages/dashboard/post';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children:[
      {
        path: 'posts',
        element: <Post/>,
      },
      {
        path: 'writters',
        element: <User/>
      },
    ]
  },
  {
    
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <DashBoard/>,
    children: [
      {
        index: true,
        element: <Navigate to={'users'} replace/>
      },
      {
        path: 'users',
        element: <User/>
      },
      {
        path: 'posts',
        element: <Post/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
