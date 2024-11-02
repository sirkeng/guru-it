import React from 'react';

import { Box, Typography, Button } from '@mui/material';

interface HeaderComponentProps {
  title: string;
  onEdit: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, onEdit }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
      <Typography variant="h3" component="div">
        {title}
      </Typography>
      <Button variant="outlined" color="primary" onClick={onEdit}>
        แก้ไข
      </Button>
    </Box>
  );
};

export default HeaderComponent;
