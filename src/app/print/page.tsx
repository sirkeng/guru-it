'use client'
import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { Box, Grid, Typography } from '@mui/material'

import { useDelayedLoading } from '@/@core/hooks/useDelayedLoading'
import Loading from '../loading'
import CustomerSignature from '@/components/maintenance/viewdata/CustomerSignature'
import ItMaintenance from '@/components/maintenance/viewdata/ItMaintenance'
import ServerNetworkStatus from '@/components/maintenance/viewdata/ServerNetworkStatus'
import CustomerInfo from '@/components/maintenance/viewdata/CustomerInfo'

const fetchMaintenanceData = async (maintenance_no: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/maintenances/byNo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ putMaintenance: maintenance_no }),
    });

    if (response.ok) {
      const data = await response.json();


      return data;
    } else {
      console.error('Error fetching maintenance data');

      return null;
    }
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
};

export default function Page() {
  const isLoading = useDelayedLoading(600); // 1.5 seconds delay
  const [data, setData] = useState<any | null>(null);

  const [firstTime, setFirstTime] = useState(true)
  const searchParams = useSearchParams();

  const maintenance_no = searchParams.get('documentNo');

  // Effect to trigger print after loading completes
  useEffect(() => {
    const loadMaintenanceData = async () => {
      const data = await fetchMaintenanceData(maintenance_no || ''); // Replace 'maintenanceNo123' with actual value

      setData(data);

    };

    loadMaintenanceData();

    if (!isLoading && typeof window !== "undefined" && firstTime) {
      const timer = setTimeout(() => {
        window.print();
      }, 500); // 5-second delay

      // Clean up the timer if the component unmounts or dependencies change
      return () => { clearTimeout(timer); setFirstTime(false); };
    }

  }, [firstTime, isLoading, maintenance_no]);

  // Conditionally render the loading screen if isLoading is true
  if (isLoading) {
    return <Loading />;
  }

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
              <img
                src="/images/logos/logo.png"
                alt="Company Logo"
                style={{ display: 'block', width: '250px', height: '100px', marginLeft: '180px' }}
              />
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
          <CustomerInfo maintenanceId='' data={data.maintenanceForm} button={'close'} />
        </Box>

        {/* Main Content */}
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <ServerNetworkStatus maintenanceId='' data={data.serverNetworkForm} button={'close'} />
          </Grid>
          <Grid item xs={12}>
            <ItMaintenance maintenanceId='' data={data.itMaintenanceForm} button={'close'} />
          </Grid>
        </Grid>

        {/* Customer Signature */}
        {data.maintenanceForm.maintenance_status === 1 && (
          <Box>
            <CustomerSignature
              signatureUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/signature/${data.maintenanceForm.maintenance_no}/${data.maintenanceForm.maintenance_signature}`}
              customerName={data.maintenanceForm.customer_name}
            />
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
