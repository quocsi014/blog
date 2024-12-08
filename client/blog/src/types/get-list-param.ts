export type GetListParam = {
  page: number;
  limit: number;
  sortBy?: string | null;
  asc?: boolean;
  query?: string;
};

export const DefaultGetListParam = {
  page: 1,
  limit: 10
}