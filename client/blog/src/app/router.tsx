import { paths } from '@/config/paths';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: async () => {
        const { LandingRoute } = await import('@/app/routes/landing');
        return { Component: LandingRoute };
      },
    },
    {
      path: paths.auth.login.path,
      lazy: async () => {
        const { LoginRoute } = await import('@/app/routes/auth/login');
        return { Component: LoginRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};
