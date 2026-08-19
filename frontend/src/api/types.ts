// Standard paginated response matching backend PagedResult<T>
export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Global ProblemDetails error response matching .NET Minimal APIs
export interface ApiErrorResponse {
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
}
