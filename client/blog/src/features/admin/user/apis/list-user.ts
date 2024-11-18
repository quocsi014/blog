import { axiosInstanceJwt } from "@/lib/axios"
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getUserList = (page: number) => {
  return axiosInstanceJwt.get(`users?page=${page}`)
}


export const getUsersQueryOptions = ({
  page,
}: { page: number } = {page: 1}) => {
  return queryOptions({
    queryKey: ['users', { page }],
    queryFn: () => getUserList(page),
  });
};

type UseDiscussionsOptions = {
  page: number;
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({
  queryConfig,
  page,
}: UseDiscussionsOptions) => {
  return useQuery({
    placeholderData: pre=>pre,
    ...getUsersQueryOptions({ page }),
    ...queryConfig,
  });
};
