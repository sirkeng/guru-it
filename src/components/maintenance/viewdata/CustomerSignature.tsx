import type { FC } from 'react';

import { Box, Typography } from '@mui/material';

interface CustomerSignatureProps {
  signatureUrl: string; // This could be a URL or base64 string
  customerName: string;
}

const CustomerSignature: FC<CustomerSignatureProps> = ({ signatureUrl, customerName }) => {
  return (
    <Box
      sx={{
        marginTop: 4,
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body1" sx={{ marginBottom: 1, fontSize: '12px' }}>
            Engineer Signature
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            ปิยะรินทร์ ภักดีวงษ์
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ marginBottom: 1, fontSize: '12px' }}>
            Customer Signature
          </Typography>
          <Box
            component="img"
            src={signatureUrl}
            alt={`${customerName}'s signature`}
            sx={{
              maxWidth: '200px',
              maxHeight: '100px',
              margin: '0 auto',
              display: 'block',
            }}
          />
          <Typography variant="body1" sx={{ marginTop: 1, fontSize: '12px' }}>
            ({customerName})
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerSignature;
