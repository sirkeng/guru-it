'use client';
import React, { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Avatar, Box, Container, Grid, Paper, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/system';
import Swal from 'sweetalert2';

import CompanyInfo from '@/components/namelist/customer/viewdata/CompanyInfo';
import ContactInfo from '@/components/namelist/customer/viewdata/ContactInfo';
import HeaderComponent from '@/components/namelist/customer/viewdata/HeaderComponent';
import SectionTitle from '@/components/namelist/customer/viewdata/SectionTitle';
import EditCustomerDialog from '@/components/namelist/customer/viewdata/EditCustomerDialog';
import Loading from '@/app/loading';
import { useDelayedLoading } from '@/@core/hooks/useDelayedLoading';

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customerData, setCustomerData] = useState<any>(); // State to store customer data
  const [loading, setLoading] = useState(true); // Loading state

  const fetchCustomerData = async (customerId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/byId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ putCustomer: customerId }),
      });

      // ตรวจสอบ response ก่อนแปลงเป็น JSON
      if (!response.ok) {
        console.error('Server Error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // ถ้า response เป็น JSON ก็แปลงข้อมูล

      setCustomerData(data);
    } catch (error) {
      console.error('Error fetching customer:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch customer data.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const editParam = searchParams.get('edit');
    const customerId = searchParams.get('pageId'); // Assuming customer_id is passed in URL

    if (editParam === 'customer') {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }

    // Fetch customer data when customer_id is available
    if (customerId) {
      fetchCustomerData(customerId);
    }

  }, [searchParams]);

  const isLoading = useDelayedLoading(1000); // 1.5 seconds delay

  if (isLoading) {
    return <Loading />;
  }

  const handleEdit = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('edit', 'customer');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete('edit');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner while fetching data
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
      <Paper>
        <Box sx={{ padding: 4 }}>
          <HeaderComponent
            title={customerData ? customerData.customer_name : 'No Data'}
            onEdit={handleEdit}
          />
          <Box display='flex' justifyContent={isMobile ? 'center' : 'flex-start'}>
            <Avatar src={customerData?.customer_img ? `${process.env.NEXT_PUBLIC_API_URL}/upload/customers/${customerData?.customer_no}/${customerData?.customer_img}` : '/images/avatars/1.png'} alt='User' sx={{ width: '100px', height: '100px' }} />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <SectionTitle title="ข้อมูลจดทะเบียนบริษัท" />
              <CompanyInfo customer={customerData} /> {/* Pass customer data */}
            </Grid>
            <Grid item xs={12} md={6}>
              <SectionTitle title="ช่องทางติดต่อ" />
              <ContactInfo customer={customerData} /> {/* Pass customer data */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <EditCustomerDialog open={dialogOpen} onClose={handleDialogClose} customerData={customerData} />
    </Container>
  );
}
