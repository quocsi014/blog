import { AdminLayout } from '@/components/layout/admin-layout';
import { AppLayout } from '@/components/layout/app-layout';
import { paths } from '@/config/paths';
import { useRefresh } from '@/features/auth/apis/refresh';
import { AuthGuard } from '@/guard/AuthGuard';
import { isFetchingSelector } from '@/redux/selector/user-selector';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.root.path,
      element: <AppLayout />,
      children: [
        {
          path: paths.app.home.path,
          lazy: async () => {
            const { PostsRoute } = await import('@/app/routes/app/home');
            return { Component: PostsRoute };
          },
        },
        {
          path: paths.app.writters.path,
          lazy: async () => {
            const { WrittersRoute } = await import('@/app/routes/app/writters');
            return { Component: WrittersRoute };
          },
        },
      ],
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
      path: paths.auth.reset.path,
      lazy: async () => {
        const { ResetPasswordRoute } = await import(
          '@/app/routes/auth/reset-password'
        );
        return { Component: ResetPasswordRoute };
      },
    },
    {
      path: paths.app.admin.path,
      element: (
        <AuthGuard>
          <AdminLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: paths.app.admin.dashboard.path,
          lazy: async () => {
            const { AdminDashboardRoute } = await import(
              '@/app/routes/app/admin/dashboard'
            );
            return { Component: AdminDashboardRoute };
          },
        },
        {
          index: true,
          path: paths.app.admin.posts.path,
          lazy: async () => {
            const { AdminPostRoute } = await import(
              '@/app/routes/app/admin/posts'
            );
            return { Component: AdminPostRoute };
          },
        },
        {
          path: paths.app.admin.category.path,
          lazy: async () => {
            const { AdminCategoryRoute } = await import(
              '@/app/routes/app/admin/category'
            );
            return { Component: AdminCategoryRoute };
          },
        },
        {
          path: paths.app.admin.comments.path,
          lazy: async () => {
            const { AdminCommentRoute } = await import(
              '@/app/routes/app/admin/comment'
            );
            return { Component: AdminCommentRoute };
          },
        },

        {
          path: paths.app.admin.users.path,
          lazy: async () => {
            const { AdminUserRoute } = await import(
              '@/app/routes/app/admin/users'
            );
            return { Component: AdminUserRoute };
          },
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  useRefresh();
  const isFetching = useSelector(isFetchingSelector);
  return (
    <>{!isFetching ? <RouterProvider router={router} /> : <div>loading</div>}</>
  );
};
