// MUI Imports
import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import CustomAvatar from '@core/components/mui/Avatar';

interface EngineerDetailsCardProps {
  engineer: {
    user_no: string
    user_id: number;
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_phone: string;
    user_jobtitle: string;
    user_role: number;
    user_img: string
  };
}

const EngineerDetailsCard: React.FC<EngineerDetailsCardProps> = ({ engineer }) => {

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/upload/engineers/${engineer.user_no}/${engineer.user_img}`;

  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-center flex-col gap-4'>
            <div className='flex flex-col items-center gap-4'>
              <CustomAvatar alt='engineer-profile' src={imageUrl} variant='rounded' size={120} />
              <Typography variant='h5'>{`${engineer.user_firstname} ${engineer.user_lastname}`}</Typography>
            </div>
            <Chip label={engineer.user_jobtitle} color='secondary' size='small' variant='tonal' />
          </div>
          <div>
            <Typography variant='h5'>Details</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Email:
                </Typography>
                <Typography>{engineer.user_email}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Phone:
                </Typography>
                <Typography>{engineer.user_phone}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Role:
                </Typography>
                <Typography>{engineer.user_role === 1 ? 'Admin' : 'Engineer'}</Typography>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngineerDetailsCard;
