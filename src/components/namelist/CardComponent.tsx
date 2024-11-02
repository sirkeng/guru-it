import React from 'react';

import { Card, CardContent, Typography, Avatar } from '@mui/material';

interface CardComponentProps {
  type: string
  no: string;
  id: number;
  name: string;
  image: string;
  detail: string;
  onClick: () => void; // Add onClick prop
}

const CardComponent: React.FC<CardComponentProps> = ({ type, no, id, name, image, detail, onClick }) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/upload/${type}/${no}/${image}`;

  return (
    <Card onClick={onClick} sx={{
      margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease-in-out',
      },
    }}>
      <Avatar alt={`Avatar ${id}`} src={imageUrl} sx={{ width: 100, height: 100, marginBottom: '15px' }} />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {detail}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
