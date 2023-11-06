type Collection<T> = Array<T> | Set<T>;

/** Remove duplicates and falsy values from arrays and sets */
export const compact = <T>(collection: Collection<T | undefined>) =>
  Array.from(new Set(collection)).filter((value): value is T => Boolean(value));

export const arrayify = (value?: string[] | string) =>
  Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];
