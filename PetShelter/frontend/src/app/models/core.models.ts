export type Unknown = null | undefined;
export interface Optional<T> {   
    value: T | Unknown;
}