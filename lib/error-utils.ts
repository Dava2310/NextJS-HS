/**
 * Allows handling the error thrown by a query to the API in a typed and appropriate way.
 * Extracts the possible message from the backend or uses the default message to throw an error.
 * @param error The error instance created by Axios or another place.
 * @param defaultMessage The default message in case there is no message extractable from the Backend.
 */
export function throwError(error: unknown, defaultMessage?: string): never {
  let message = defaultMessage || 'An unexpected error occurred.';

  if (error && typeof error === 'object' && 'response' in error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    message = err.response?.data?.message || message;
  }

  throw new Error(message);
}
