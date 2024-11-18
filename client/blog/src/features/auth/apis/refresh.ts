import { getMe } from '@/features/auth/apis/get-me';
import { axiosInstance, getBearerAuthConfig } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useAppDispatch, useAppSelector} from '@/redux/hooks';
import { triggerSelector } from '@/redux/selector/user-selector';
import { setAccessToken, setIsFetching, setUser} from '@/redux/slices/user-slice';
import { TokenPair } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect} from 'react';

export const refreshToken = (token: string): Promise<TokenPair> => {
  console.log({token})
  const config = getBearerAuthConfig(token);
  return axiosInstance.post('auth/refresh', undefined, config);
};

export type UseRefreshOptions = {
  mutationConfig?: MutationConfig<typeof refreshToken>;
};

export const useRefresh = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const trigger = useAppSelector(triggerSelector)
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
      console.log("success")
      dispatch(setUser(user));
      dispatch(setIsFetching(false))
    },
    onError: (error)=>{
      console.log({error})
    }
  });
  useEffect(() => {
    const refreshToken = Cookies.get('refresh_token');
    if (refreshToken) {
      console.log(refreshToken)
      mutate(refreshToken);
    }else{
      setIsFetching(false)
    }
  }, [mutate, trigger]);

  return { isError };
};
