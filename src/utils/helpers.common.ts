// HELPERS

// Check if it is an error instance or not
export function isError(error: unknown) {
  return error instanceof Error;
}

// Convert a string to its case text (first and last letter capitalized)
export function parseCaseText(text: string): string {
  if (!text) return '';
  const words = text.trim().split(' ').filter(Boolean);
  const first = words[0][0];
  const last = words[words.length - 1][0];

  return (first + last).toUpperCase();
}
