export const paths = {
  root: {
    path: '/',
    getHref: () => '/',
  },
  auth: {
    register: {
      path: 'auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${redirectTo}` : ''}`,
    },
    login: {
      path: 'auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${redirectTo}` : ''}`,
    },
    requestOtp: {
      path: '/auth/otp/request',
      getHref: (target: string) => `/auth/otp/request?target=${target}`,
    },
    verifyOtp: {
      path: '/auth/otp/verify',
      getHref: (redirectTo: string, email: string) =>
        `/auth/otp/verify?email=${email}&redirectTo=${redirectTo}?email=${email}`,
    },
    reset: {
      path: 'auth/reset',
      getHref: () => '/auth/reset',
    },
  },
  app: {
    home: {
      path: 'home',
      getHref: () => '/home',
    },
    post: {
      path: 'posts/:postId',
      getHref: (id: number) => `/posts/${id}`,
    },
    writters: {
      path: 'writters',
      getHref: () => '/writters',
    },
    writter: {
      path: 'writters/writterId',
      getHref: (id: number) => `/writters/${id}`,
    },
    admin: {
      path: 'admin',
      getHref: () => 'admin',
      dashboard: {
        path: 'admin/dashboard',
        getHref: () => '/admin/dashboard',
      },
      users: {
        path: 'users',
        getHref: () => '/admin/users',
      },
      user: {
        path: 'users/:userId',
        getHref: (id: number) => `/admin/users/${id}`,
      },
      posts: {
        path: 'posts',
        getHref: () => '/admin/posts',
      },
      post: {
        path: 'posts/:postId',
        getHref: (id: number) => `/admin/posts/${id}`,
      },
      stat: {
        path: 'stat',
        getHref: () => '/admin/stat',
      },
      category: {
        path: 'categories',
        getHref: () => '/admin/categories',
      },
      comments: {
        path: 'comments',
        getHref: () => '/admin/comments',
      },
    },
  },
  no_permisstion: {
    path: 'no-permisstion',
    getHref: () => '/no-permisstion',
  },
};
