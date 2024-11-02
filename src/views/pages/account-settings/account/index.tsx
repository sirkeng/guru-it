'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react'; // ใช้ NextAuth เพื่อตรวจสอบ session
import { Container, Grid } from '@mui/material';

import AccountDetails from './AccountDetails';

const AccountSettingsPage = () => {
  const { data: session, status } = useSession(); // ใช้เพื่อตรวจสอบเซสชัน
  const [userData, setUserData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  //ดึงข้อมูล user_id จาก session
  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.user_account?.user_id) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/engineers/byId`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ putEngineer: session.user_account.user_id }), // ใช้ 1 เป็นตัวอย่าง user_id
          });

          const data = await response.json();

          if (response.ok) {
            setUserData(data); // สมมติว่าดึงข้อมูลของ engineer แค่คนเดียว
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session, status]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(userData)

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {userData && <AccountDetails userDataAPI={userData} />} {/* ส่ง userData ไปที่ AccountDetails */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountSettingsPage;
