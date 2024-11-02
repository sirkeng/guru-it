import React from 'react';

import { Box, Typography } from '@mui/material';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <Box display="flex" alignItems="center" marginBottom="10px">
      <Box component="span" sx={{ backgroundColor: '#3f51b5', width: '8px', height: '8px', borderRadius: '50%', marginRight: '10px' }} />
      <Typography variant="h4" component="div" color="textSecondary">
        {title}
      </Typography>
    </Box>
  );
};

export default SectionTitle;
