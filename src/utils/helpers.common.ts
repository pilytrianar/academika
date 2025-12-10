// HELPERS

// Check if it is an error instance or not
export function isError(error: unknown) {
  return error instanceof Error;
}
