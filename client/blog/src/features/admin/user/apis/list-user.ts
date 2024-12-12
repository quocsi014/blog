import { axiosInstanceJwt } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { DefaultGetListParam, GetListParam } from '@/types/get-list-param';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getUserList = (param: GetListParam) => {
  console.log('get');
  return axiosInstanceJwt.get(
    `users?page=${param.page}&limit=${param.limit}${param.sortBy ? `&sort_by=${param.sortBy}` : ''}${param.asc != null ? `&asc=${param.asc}` : ''}${param.query ? `&query=${param.query}` : ''}`,
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

type UseUsersOptions = GetListParam & {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({
  queryConfig,
  page,
  limit,
  query,
  sortBy,
  asc,
}: UseUsersOptions) => {
  return useQuery({
    placeholderData: (pre) => pre,
    ...getUsersQueryOptions({ page, limit, query, sortBy, asc }),
    ...queryConfig,
  });
};
