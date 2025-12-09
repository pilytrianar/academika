import Image from 'next/image';
import Button from '../Button';
import { ArrowForward } from '@mui/icons-material';
import { Typography } from '@mui/material';

const ImageTypes = {
  asignaturas: '/img/asignaturas.svg',
  estudiantes: '/img/estudiantes.svg',
};

type ImageType = keyof typeof ImageTypes;

interface NavigationCardProps {
  image: ImageType;
  title: string;
  description: string;
  btnText: string;
  onClick: () => void;
}

const NavigationCard = ({ image, title, description, btnText, onClick }: NavigationCardProps) => {
  const src = ImageTypes[image];
  return (
    <div className='p-4 border border-gray-200 rounded-lg w-[642px] shadow-lg'>
      <div className='flex items-center mb-4 gap-x-4'>
        <div className='bg-[#82BDF63B] rounded-md p-2'>
          <Image width={42} height={42} alt={`${title}-image`} src={src} />
        </div>
        <div>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {description}
          </Typography>
        </div>
      </div>
      <Button
        text={btnText}
        fullWidth
        rounded='8px'
        sx={{ fontWeight: 'bold' }}
        endIcon={<ArrowForward />}
        onClick={onClick}
      />
    </div>
  );
};

export default NavigationCard;
