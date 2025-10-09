import * as R from "ramda";

type AnyObject = Record<string, any>;

/**
 * Converts a snake_case string to camelCase.
 */
const toCamelCase = (str: string): string =>
  str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

/**
 * Converts a camelCase or PascalCase string to snake_case.
 */
const toSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * Recursively converts object keys to camelCase.
 */
export const convertKeysToCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase) as unknown as T;
  } else if (R.is(Object, obj)) {
    return R.pipe(
      R.toPairs,
      R.map(([key, value]) => [toCamelCase(key), convertKeysToCamelCase(value)]),
      R.fromPairs
    )(obj as AnyObject) as T;
  }

  return obj;
};

/**
 * Recursively converts object keys to snake_case.
 */
export const convertKeysToSnakeCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToSnakeCase) as unknown as T;
  } else if (R.is(Object, obj)) {
    return R.pipe(
      R.toPairs,
      R.map(([key, value]) => [toSnakeCase(key), convertKeysToSnakeCase(value)]),
      R.fromPairs
    )(obj as AnyObject) as T;
  }

  return obj;
};
