export interface ListDataResponse<T>{
  totalPage: number;

  limit: number;

  page: number;

  items: T[];
}