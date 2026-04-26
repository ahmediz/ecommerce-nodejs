export type ApiResponseWithPagination<T> = {
  result: T;
  total?: number;
  page?: number;
  limit?: number;
};

export type ApiResponse<T> = {
  result: T;
};
