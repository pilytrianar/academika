import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Academika',
    short_name: 'Academika',
    description: 'Una plataforma de gestión académica eficiente y fácil de usar.',
    start_url: '/',
    display: 'standalone',
  };
}
