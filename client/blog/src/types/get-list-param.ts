export type GetListParam = {
  page: number;
  limit: number;
  sortBy?: string | null;
  asc?: boolean | null;
  query?: string;
};

export const DefaultGetListParam = {
  page: 1,
  limit: 10
}