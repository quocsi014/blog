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
    {
      path: paths.app.posts.path,
      lazy: async () => {
        const { PostsRoute } = await import('@/app/routes/app/posts');
        return { Component: PostsRoute };
      },
    }
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};
