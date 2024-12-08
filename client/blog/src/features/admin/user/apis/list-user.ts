import { axiosInstanceJwt } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { DefaultGetListParam, GetListParam } from '@/types/get-list-param';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getUserList = (param: GetListParam) => {
  console.log('get')
  return axiosInstanceJwt.get(
    `users?page=${param.page}&limit=${param.limit}
    ${param.sortBy ? `&sortBy=${param.sortBy}` : ''}
    ${param.asc ? `&asc=${param.asc}` : ''}
    ${param.query ? `&query=${param.query}` : ''}`,
  );
};

export const getUsersQueryOptions = (
  param: GetListParam = DefaultGetListParam,
) => {
  return queryOptions({
    queryKey: ['users', param],
    queryFn: () => getUserList(param),
  });
};

type UseDiscussionsOptions = GetListParam & {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({
  queryConfig,
  page,
  limit,
  query
}: UseDiscussionsOptions) => {
  return useQuery({
    placeholderData: (pre) => pre,
    ...getUsersQueryOptions({ page, limit, query }),
    ...queryConfig,
  });
};
