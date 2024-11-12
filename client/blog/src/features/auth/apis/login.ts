import { useAuth } from '@/hooks/useAuth';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { TokenPair } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
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
  const { setAccessToken } = useAuth();
  const {onSuccess, ...restConfig} = mutationConfig || {}
  return useMutation({
    mutationFn: login,
    onSuccess: (...args) => {
      setAccessToken(args[0].access_token);
      Cookies.set('refresh_token', args[0].refresh_token, { expires: 30 });
      onSuccess?.(...args)
    },
    ...restConfig,
  });
};
