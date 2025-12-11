export const ImageTypes = {
  asignaturas: '/img/asignaturas.svg',
  estudiantes: '/img/estudiantes.svg',
};

type ImageType = keyof typeof ImageTypes;

export interface NavigationCardProps {
  image: ImageType;
  title: string;
  description: string;
  btnText: string;
  onClick: () => void;
}
