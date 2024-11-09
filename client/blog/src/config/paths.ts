export const paths = {
  home: {
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
      path:'/auth/otp/verify',
      getHref: (redirectTo: string, email: string) => `/auth/otp/verify?email=${email}&redirectTo=${redirectTo}`,
    },
    forgotPassword: {
      path: 'auth/forgot',
      getHref: ()=>'/auth/forgot',
    },
  },
  app: {
    posts: {
      path: 'posts',
      getHref: ()=>'/posts',
    },
    post: {
      path: 'posts/:postId',
      getHref: (id: number)=>`/posts/${id}`,
    },
    writters: {
      path: 'writters',
      getHref: ()=> '/writters'
    },
    writter: {
      path: 'writters/writterId',
      getHref: (id: number)=>`/writters/${id}`,
    },
    admin: {
      dashboard: {
        path: 'admin',
        getHref: ()=> '/admin',
      },
      users: {
        path: 'users',
        getHref: ()=>'/admin/users'
      },
      user: {
        path: 'users/:userId',
        getHref: (id: number)=>`/admin/users/${id}`,
      },
      posts: {
        path: 'posts',
        getHref: ()=>'/admin/posts',
      },
      post: {
        path: 'posts/:postId',
        getHref: (id: number) => `/admin/posts/${id}`,
      },
      stat: {
        path: 'stat',
        getHref: ()=> '/admin/stat' 
      },
      category: {
        path: 'categories',
        getHref: ()=>'/admin/categories',
      },
    },
  },
  
};
