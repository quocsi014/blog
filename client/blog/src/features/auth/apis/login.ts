import { getMe } from '@/features/auth/apis/get-me';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useAppDispatch } from '@/redux/hooks';
import { setAccessToken, setUser } from '@/redux/slices/user-slice';
import { TokenPair } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'this field must be an email' }),
  password: z.string().min(1, {
    message: 'this field is required',
  }),
});

type loginFormInput = z.infer<typeof loginFormSchema>;

export const login = (data: loginFormInput): Promise<TokenPair> => {
  return axiosInstance.post('auth/login', data);
};

export type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const query = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: login,
    onSuccess: async (...args) => {
      dispatch(setAccessToken(args[0].access_token));
      Cookies.set('refresh_token', args[0].refresh_token, { expires: 30 });
      const user = await query.fetchQuery({
        queryKey: ['me'],
        queryFn: () => getMe(args[0].access_token),
      });
      dispatch(setUser(user));
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
