import { axiosInstance, getBearerAuthConfig } from '@/lib/axios';
import { accessTokenSelector } from '@/redux/selector/user-selector';
import { User } from '@/types/user';
import { useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export const getMe = (token: string | null): Promise<User> => {
  const config = getBearerAuthConfig(token);
  return axiosInstance.get('users/me', config);
};

export const useGetMe = () => {
  const accessToken = useSelector(accessTokenSelector)
  return useQuery({
    queryKey: ['me'],
    queryFn: () => {
      if (!accessToken || accessToken === '') {
        return Promise.resolve(null);
      }
      return getMe(accessToken);
    }
  });
};
