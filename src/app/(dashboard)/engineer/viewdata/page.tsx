'use client'
import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation';

import { Container, Grid } from '@mui/material';

import EngineerDetailsCard from '@/components/namelist/engineer/viewdata/EngineerDetailsCard';
import EngineerProjectList from '@/components/namelist/engineer/viewdata/EngineerProjectList';
import Loading from '@/app/loading';

export default function Page() {
  const searchParams = useSearchParams();

  const [engineerData, setEngineerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch engineer data from API
  const fetchEngineerData = async (engineerId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/engineers/byId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ putEngineer: engineerId }), // ใช้ 1 เป็นตัวอย่าง user_id
      });

      const data = await response.json();

      if (response.ok) {
        setEngineerData(data); // สมมติว่าดึงข้อมูลของ engineer แค่คนเดียว
      }
    } catch (error) {
      console.error('Error fetching engineer data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const engineerId = searchParams.get('pageId'); // Assuming customer_id is passed in URL

    if (engineerId) {
      fetchEngineerData(engineerId);
    }
  }, [searchParams]);

  if (loading) {
    return <Loading />; // Loading state
  }

  // const handleSubmit = () => {
  //   Swal.fire({
  //     title: 'สำเร็จ!',
  //     text: 'คุณแก้ไขข้อมูลพนักงานสำเร็จ.',
  //     icon: 'success',
  //     timer: 2000, // Close after 3 seconds (3000 milliseconds)
  //     timerProgressBar: true, // Show a progress bar
  //     showConfirmButton: false, // Hide the confirm button
  //   })
  // }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
      <Grid container spacing={4}>
        <Grid item md={4} xs={12}>
          {engineerData && <EngineerDetailsCard engineer={engineerData} />}
        </Grid>
        <Grid item md={8} xs={12}>
          <EngineerProjectList />
        </Grid>
      </Grid>
    </Container>
  )
}
