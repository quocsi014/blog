import { getMe } from '@/features/auth/apis/get-me';
import { axiosInstance, getBearerAuthConfig } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useAppDispatch } from '@/redux/hooks';
import { setAccessToken, setUser } from '@/redux/slices/user-slice';
import { TokenPair } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export const refreshToken = (token: string): Promise<TokenPair> => {
  const config = getBearerAuthConfig(token);
  return axiosInstance.post('auth/refresh', undefined, config);
};

export type UseRefreshOptions = {
  mutationConfig?: MutationConfig<typeof refreshToken>;
};

export const useRefresh = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutate, isError } = useMutation({
    mutationFn: refreshToken,
    onSuccess: async (data) => {
      const { access_token, refresh_token } = data;
      dispatch(setAccessToken(access_token));
      Cookies.set('refresh_token', refresh_token, { expires: 30 });
      const user = await queryClient.fetchQuery({
        queryKey: ['me'],
        queryFn: () => getMe(access_token),
      });
      dispatch(setUser(user));
    },

  });

  useEffect(() => {
    const refreshToken = Cookies.get('refresh_token');
    if (refreshToken) {
      mutate(refreshToken);
    }
  }, [mutate]);

  return { isError };
};
