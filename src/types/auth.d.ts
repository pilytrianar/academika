import { Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FormikErrors, FormikTouched } from 'formik';

export type LoginValues = { email: string; password: string };
export type RevealIconProps = { reveal: boolean; setReveal: () => void; disabled?: boolean };

export type HandleSubmitProps = {
  values: LoginValues;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  router: AppRouterInstance;
};

export type ErrorTextProps<T> = {
  name: keyof T;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
};
