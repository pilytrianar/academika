export const API_MESSAGES = {
  200: 'Transacción éxitosa.',
  400: 'Solicitud incorrecta.',
  401: 'Acceso no autorizado.',
  500: 'Ocurrió un error inesperado.',
};

export const basePostReq = { method: 'POST', headers: { 'Content-Type': 'application/json' } };

export const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password'];
