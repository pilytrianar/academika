import * as yup from 'yup';
import { ValidateInputReturn } from '@/types/schema';

export async function validateInput<T>(schema: yup.Schema<T>, data: unknown): ValidateInputReturn {
  try {
    const validatedData = await schema.validate(data, { abortEarly: false });
    return { success: true, data: validatedData };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors: Record<string, string[]> = {};

      err.inner.forEach(e => {
        if (!e.path) return;

        if (!errors[e.path]) {
          errors[e.path] = [];
        }

        errors[e.path].push(e.message);
      });

      return { success: false, errors };
    }

    throw err;
  }
}
