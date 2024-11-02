import React from 'react';

import { Button } from '@mui/material';

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

const AddButtonComponent: React.FC<AddButtonProps> = ({ onClick, label }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{ marginBottom: '20px' }}
    >
      {label}
    </Button>
  );
};

export default AddButtonComponent;
