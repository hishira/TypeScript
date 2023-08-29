export interface FilterOption<T = unknown> {
  getOption(): T;
  limit?: number;
}
