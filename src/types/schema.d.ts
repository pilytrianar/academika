export type ValidateInputReturn = Promise<
  { success: true; data: T } | { success: false; errors: Record<string, string[]> }
>;
