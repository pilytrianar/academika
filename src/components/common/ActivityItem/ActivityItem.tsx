'use client';

import { Typography } from '@mui/material';
import Image from 'next/image';
import { ActivityItemProps, ImageBadgeTypes } from './ActivityItem.types';
import { getBgColor } from '@/utils/helpers.common';

const ActivityItem = ({ title, description, imageBadge }: ActivityItemProps) => {
  const src = ImageBadgeTypes[imageBadge] || ImageBadgeTypes.REMINDER;
  const badgeColor = getBgColor(imageBadge);

  return (
    <li className='flex items-center p-2 mb-2 bg-white border border-gray-200 rounded-lg gap-x-4'>
      <div className={`${badgeColor} rounded-full p-2`}>
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
