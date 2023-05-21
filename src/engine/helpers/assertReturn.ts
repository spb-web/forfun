export const assertReturn = <T>(v: T, message = 'value is nil'): NonNullable<T> => {
  if (!v) {
    throw new Error(message)
  }

  return v
}