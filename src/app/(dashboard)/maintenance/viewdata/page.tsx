'use client';
import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Box, Container, Grid, Paper } from '@mui/material';

import CustomerInfo from '@/components/maintenance/viewdata/CustomerInfo';
import ServerNetworkStatus from '@/components/maintenance/viewdata/ServerNetworkStatus';
import ItMaintenance from '@/components/maintenance/viewdata/ItMaintenance';
import TabAction from '@/components/maintenance/viewdata/tab/tabAction';
import CustomerSignature from '@/components/maintenance/viewdata/CustomerSignature';
import { useDelayedLoading } from '@/@core/hooks/useDelayedLoading';
import Loading from '@/app/loading';

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
  const [maintenanceData, setMaintenanceData] = useState<any | null>(null);
  const isLoading = useDelayedLoading(600); // 1.5 seconds delay

  const searchParams = useSearchParams();

  const maintenance_no = searchParams.get('documentNo');

  const [maintenanceId, setMaintenanceId] = useState<any>('')

  useEffect(() => {
    const loadMaintenanceData = async () => {
      const data = await fetchMaintenanceData(maintenance_no || ''); // Replace 'maintenanceNo123' with actual value

      setMaintenanceData(data);
      console.log(data)
      setMaintenanceId(data.maintenanceForm.maintenance_id)

    };

    loadMaintenanceData();
  }, [maintenance_no]);

  if (isLoading || !maintenanceData) {
    return <Loading />;
  }

  return (
    <Container>
      <Box sx={{ marginTop: 4 }}>
        {/* TabAction */}
        <TabAction status={maintenanceData.maintenanceForm?.maintenance_status} />
        <Paper elevation={3}>
          <Box sx={{ padding: 4 }}>
            {/* Left side with customer info */}
            <CustomerInfo data={maintenanceData.maintenanceForm} maintenanceId={maintenanceId} button={'open'} />
            <Grid container spacing={6}>
              <Grid item xs={12}>
                {/* Server Network Status */}
                <ServerNetworkStatus data={maintenanceData.serverNetworkForm} maintenanceId={maintenanceId} button={'open'} />
              </Grid>
              <Grid item xs={12}>
                {/* IT Maintenance */}
                <ItMaintenance data={maintenanceData.itMaintenanceForm} maintenanceId={maintenanceId} button={'open'} />
              </Grid>
              <Grid item xs={12}>
                {/* Customer Signature if maintenanceForm.status === 1 */}
                {maintenanceData.maintenanceForm?.status === 1 && (
                  <CustomerSignature
                    signatureUrl="/images/maintenance/signature.png" // Replace with the actual signature URL or data
                    customerName={maintenanceData.maintenanceForm?.customer}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
