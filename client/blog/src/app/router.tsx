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
      path: paths.auth.requestOtp.path,
      lazy: async () => {
        const { RequestOtpRoute } = await import(
          '@/app/routes/auth/request-otp'
        );
        return { Component: RequestOtpRoute };
      },
    },
    {
      path: paths.auth.verifyOtp.path,
      lazy: async () => {
        const { VerifyOtpRoute } = await import('@/app/routes/auth/verify-otp');
        return { Component: VerifyOtpRoute };
      },
    },
    {
      path: paths.auth.register.path,
      lazy: async () => {
        const { RegisterRoute } = await import('@/app/routes/auth/register');
        return { Component: RegisterRoute };
      },
    },
    {
      path: paths.app.posts.path,
      lazy: async () => {
        const { PostsRoute } = await import('@/app/routes/app/posts');
        return { Component: PostsRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};
