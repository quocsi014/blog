import { axiosInstance, getBearerAuthConfig } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useAppDispatch } from '@/redux/hooks';
import { clearUser } from '@/redux/slices/user-slice';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const logout = (token: string | null): Promise<void> => {
  const config = getBearerAuthConfig(token);
  return axiosInstance.post('auth/logout', undefined, config);
};

export type UseLogoutOptions = {
  mutationConfig?: MutationConfig<typeof logout>;
};

export const useLogout = ({ mutationConfig }: UseLogoutOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: logout,
    onSuccess: async (...agrs) => {
      Cookies.remove('refresh_token');
      dispatch(clearUser());
      onSuccess?.(...agrs);
    },
    ...restConfig,
  });
};
