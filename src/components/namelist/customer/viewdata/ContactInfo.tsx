import React from 'react';

import { Box, Typography } from '@mui/material';

interface ContactInfoProps {
  customer: {
    customer_contact: number;
    customer_name: string;
    customer_address: string;
    customer_dist: string;
    customer_prov: string;
  };
}

const ContactInfo: React.FC<ContactInfoProps> = ({ customer }) => {
  return (
    <Box padding="10px" borderRadius="8px">
      <Typography variant="body1" sx={{ fontSize: '16px' }}>
        ชื่อผู้ติดต่อ : {customer?.customer_name}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '16px' }}>
        ที่อยู่ส่งเอกสาร : {`${customer?.customer_address}, ${customer?.customer_dist}, ${customer?.customer_prov}`}
      </Typography>
    </Box>
  );
};

export default ContactInfo;
