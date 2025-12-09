import { Card as MuiCard, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '../Button';

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Card = ({ title = 'Title', description = 'Description', onClick }: CardProps) => {
  return (
    <MuiCard variant='elevation' sx={{ width: 418, height: 250, borderRadius: 3 }}>
      <CardMedia
        component='img'
        title='Academika'
        image='/img/logo.svg'
        sx={{ width: 120, height: 120, objectFit: 'contain', margin: 'auto' }}
      />
      <CardContent>
        <Typography variant='h6' sx={{ fontWeight: '600' }}>
          {title}
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          {description}
        </Typography>
        <Button text='Ver Detalles' variant='text' sx={{ fontWeight: 'bold' }} onClick={onClick} />
      </CardContent>
    </MuiCard>
  );
};

export default Card;
