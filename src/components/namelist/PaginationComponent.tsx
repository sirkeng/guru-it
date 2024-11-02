import React from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationComponentProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ count, page, onChange }) => {
  return (
    <Stack spacing={2} sx={{ marginTop: '20px', alignItems: 'center' }}>
      <Pagination count={count} page={page} onChange={onChange} />
    </Stack>
  );
};

export default PaginationComponent;
