import * as yup from 'yup';

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('El correo es obligatorio')
    .matches(EMAIL_REGEX, 'Formato de correo inválido'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
