export const ImageBadgeTypes = {
  accion: '/img/accion.svg',
  recordatorio: '/img/recordatorio.svg',
};

type ImageBadgeType = keyof typeof ImageBadgeTypes;

export interface ActivityItemProps {
  imageBadge: ImageBadgeType;
  title: string;
  description: string;
}
