import { axiosInstanceJwt } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { Category } from '@/types/category';
import { DefaultGetListParam, GetListParam } from '@/types/get-list-param';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCategoryList = (param: GetListParam) => {
  return axiosInstanceJwt.get(
    `categories?page=${param.page}&limit=${param.limit}${param.sortBy ? `&sort_by=${param.sortBy}` : ''}${param.asc != null ? `&asc=${param.asc}` : ''}${param.query ? `&query=${param.query}` : ''}`,
  );
};

export const getCategoriesQueryOptions = (
  param: GetListParam = DefaultGetListParam,
) => {
  return queryOptions({
    queryKey: ['categories', param],
    queryFn: () => getCategoryList(param),
  });
};

type UseCategoriesOptions = GetListParam & {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useCategories = ({
  queryConfig,
  page,
  limit,
  query,
  sortBy,
  asc,
}: UseCategoriesOptions) => {
  return useQuery({
    placeholderData: (pre) => pre,
    ...getCategoriesQueryOptions({ page, limit, query, sortBy, asc }),
    ...queryConfig,
  });
};
