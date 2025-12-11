'use client';

import { Typography } from '@mui/material';
import Image from 'next/image';
import { ActivityItemProps, ImageBadgeTypes } from './ActivityItem.types';

const ActivityItem = ({ title, description, imageBadge }: ActivityItemProps) => {
  const src = ImageBadgeTypes[imageBadge];
  const imgBg = imageBadge === 'accion' ? 'bg-[#DCFCE7]' : 'bg-[#FFEDD5]';
  return (
    <li className='flex items-center p-2 mb-2 bg-white border border-gray-200 rounded-lg gap-x-4'>
      <div className={`${imgBg} rounded-full p-2`}>
        <Image width={36} height={36} alt='' src={src} />
      </div>
      <div>
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography color='textSecondary' variant='body1'>
          {description}
        </Typography>
      </div>
    </li>
  );
};

export default ActivityItem;
