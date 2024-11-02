import React from 'react';

import { Typography } from '@mui/material';

interface CompanyInfoProps {
  customer: {
    customer_type: number;
    customer_tax: string;
    customer_name: string;
    customer_address: string;
    customer_subdist: string;
    customer_dist: string;
    customer_prov: string;
    customer_postal: number;
  };
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ customer }) => {
  return (
    <div>
      <Typography variant="body1" sx={{ fontSize: '16px' }}>
        ประเภทกิจการ : {customer?.customer_type === 1 ? 'สำนักงานใหญ่' : customer?.customer_type === 2 ? 'สาขา' : 'ไม่มี'}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '16px' }}>
        เลขทะเบียนนิติบุคคล : {customer?.customer_tax}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '16px' }}>
        ชื่อบริษัท : {customer?.customer_name}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '16px' }}>
        ที่อยู่จดทะเบียน : {`${customer?.customer_address}, ${customer?.customer_subdist}, ${customer?.customer_dist}, ${customer?.customer_prov} ${customer?.customer_postal}`}
      </Typography>
    </div>
  );
};

export default CompanyInfo;
