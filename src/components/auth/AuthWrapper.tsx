'use client';

import { RootState } from '@/lib/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ComponentLoader from '../common/Loaders/ComponentLoader';
import { clearAuthToken, getAuthToken } from '@/server/auth/config/storage.service';
import useActions from '@/hooks/useActions';
import { setAuthenticated } from '@/lib/store/slices/auth/auth';
import { decodeJWT, isTokenExpired } from './jwt.helpers';
import { PUBLIC_ROUTES } from '@/utils/constants';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const actions = useActions({ setAuthenticated });
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isHydrated, setIsHydrated] = useState(false);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // Hidratar Redux desde token al montar
  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();

      if (!token) {
        setIsHydrated(true);
        return;
      }

      // Verifica si el token expiró
      if (isTokenExpired(token)) {
        clearAuthToken();
        setIsHydrated(true);
        return;
      }

      // Verifica con el servidor que el token siga siendo válido
      try {
        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (data.success) {
          // Decodifica el token para obtener el user
          const payload = decodeJWT(token);

          if (payload) {
            actions.setAuthenticated({
              isAuthenticated: true,
              user: {
                id: payload.userId,
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
              },
            });
          }
        } else {
          // Token inválido, limpia localStorage
          clearAuthToken();
        }
      } catch (error) {
        console.error('Error verificando token:', error);
        clearAuthToken();
      } finally {
        setIsHydrated(true);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirigir después de hidratar
  useEffect(() => {
    if (!isHydrated) return;

    if (!isPublicRoute && !isAuthenticated) {
      router.replace('/login');
    }

    if (isPublicRoute && isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, isPublicRoute, router, isHydrated]);

  // Mostrar loader hasta hidratar
  if (!isHydrated) {
    return <ComponentLoader />;
  }

  // Rutas públicas siempre se muestran
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Rutas privadas solo si está autenticado
  if (!isAuthenticated) {
    return <ComponentLoader />;
  }

  return <>{children}</>;
}
