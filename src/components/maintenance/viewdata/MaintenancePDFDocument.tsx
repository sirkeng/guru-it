// app/components/MaintenancePDFDocument.tsx
import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import CustomerInfo from './CustomerInfo';
import ServerNetworkStatus from './ServerNetworkStatus';
import ItMaintenance from './ItMaintenance';
import CustomerSignature from './CustomerSignature';
import type { MaintenanceData } from '@/types/maintenance';

export function MaintenancePDFDocument(data: MaintenanceData) {

  return (
    <React.Fragment>
      <Box>
        {/* Header with Logo and Company Details */}
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
          {/* Left Spacer */}
          <Box flexGrow={1} />

          {/* Center Logo */}
          <Box>
            <Typography variant="h6" component="div">
              <img src="/images/logos/logo.png" alt="Company Logo" style={{ display: 'block', width: '250px', height: '100px', marginLeft: '180px' }} />
            </Typography>
          </Box>

          {/* Right Details */}
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1" sx={{ fontSize: '12px' }}>2823/3 My Office Charoen Krung</Typography>
              <Typography variant="body1" sx={{ fontSize: '12px' }}>Unit 309 Charoen Krung Road</Typography>
              <Typography variant="body1" sx={{ fontSize: '12px' }}>Bang Kho Laem, Bang Kho Laem</Typography>
              <Typography variant="body1" sx={{ fontSize: '12px' }}>Bangkok 10120</Typography>
              <Typography variant="body1" sx={{ fontSize: '12px' }}>+66 (0) 2114 7328</Typography>
              <Typography variant="body1" sx={{ fontSize: '12px' }}>www.guru-itsolution.com</Typography>
              <Typography variant="body1" sx={{ fontSize: '12px' }}>support@guru-itsolution.com</Typography>
            </Box>
          </Box>
        </Box>

        {/* Customer Information */}
        <Box>
          <CustomerInfo data={data.maintenanceForm} button={'close'} />
        </Box>

        {/* Main Content */}
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <ServerNetworkStatus data={data.serverNetworkForm} button={'close'} />
          </Grid>
          <Grid item xs={12}>
            <ItMaintenance data={data.itMaintenanceForm} button={'close'} />
          </Grid>
        </Grid>

        {/* Customer Signature */}
        {data.maintenanceForm.status === 1 && (
          <Box>
            <CustomerSignature
              signatureUrl="/images/maintenance/signature.png"
              customerName={data.maintenanceForm.customer}
            />
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}

