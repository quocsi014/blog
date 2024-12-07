export class PagingResponse<T> {
  constructor(limit: number, page: number) {
    this.limit = limit;
    this.page = page;
  }
  process() {
    if (!this.limit || this.limit < 10) {
      this.limit = 10;
    }
    if (!this.page || this.page < 1) {
      this.page = 1;
    }
  }
  totalPage: number;

  limit: number;

  page: number;

  query: string | null | undefined;

  sortBy: string | null | undefined;

  ascending: boolean | null | undefined;

  items: T[];
}
