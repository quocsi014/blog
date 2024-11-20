import { axiosInstanceJwt } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getUserList = (page: number, limit: number) => {
  return axiosInstanceJwt.get(`users?page=${page}&limit=${limit}`);
};

export const getUsersQueryOptions = (
  { page, limit }: { page: number; limit: number } = { page: 1, limit: 10 },
) => {
  return queryOptions({
    queryKey: ['users', { page, limit }],
    queryFn: () => getUserList(page, limit),
  });
};

type UseDiscussionsOptions = {
  page: number;
  limit: number;
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({
  queryConfig,
  page,
  limit,
}: UseDiscussionsOptions) => {
  return useQuery({
    placeholderData: (pre) => pre,
    ...getUsersQueryOptions({ page, limit }),
    ...queryConfig,
  });
};
