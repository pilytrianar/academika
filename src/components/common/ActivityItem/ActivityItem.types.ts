export const ImageBadgeTypes: Record<string, string> = {
  NEW_STUDENT: '/img/accion.svg',
  REMINDER: '/img/recordatorio.svg',
  GRADE: '/img/recordatorio.svg',
  DISCIPLINARY: '/img/accion.svg',
  ANNOUNCEMENT: '/img/recordatorio.svg',
};

type ImageBadgeType = keyof typeof ImageBadgeTypes;

export interface ActivityItemProps {
  imageBadge: ImageBadgeType | string;
  title: string;
  description: string;
}
