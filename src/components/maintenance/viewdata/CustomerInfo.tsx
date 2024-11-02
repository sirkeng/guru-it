import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Box, Typography, Button, Autocomplete, TextField } from '@mui/material';

import Swal from 'sweetalert2';

import type { MaintenanceForm } from '@/types/maintenance';

interface CustomerInfoProps {
  data: MaintenanceForm;
  button: string;
  maintenanceId: string
}

type CustomerOption = {
  label: string;
  value: string;
};

const CustomerInfo: FC<CustomerInfoProps> = ({ data, button, maintenanceId }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const [maintenanceForm, setmaintenanceForm] = useState<any>({
    customer: data.customer_name,
    name: data.customer_name
  });

  const [fetchCustomers, setFetchCustomers] = useState<CustomerOption[]>([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/all`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ putCustomer: 'All' }), // ส่งข้อมูล putCustomer=All
        });

        const data = await response.json();

        if (response.ok) {
          // Mapping API data to label and value format for Autocomplete
          const customerOptions = data.map((customer: any) => ({
            label: `${customer.customer_name} - ${customer.customer_address}`,
            value: customer.customer_id.toString(), // ใช้ customer_id เป็นค่า value
          }));

          setFetchCustomers(customerOptions);
        } else {
          console.error('Failed to fetch customers');
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []); // ดึงข้อมูลครั้งเดียวเมื่อ component โหลด

  // ฟังก์ชันที่ใช้เมื่อคลิกปุ่มแก้ไขหรือบันทึก
  const handleEditClick = async () => {
    if (!isEditing) {
      // เพิ่ม 'edit1=customer+info' ใน URL เมื่อต้องการเข้าสู่โหมดแก้ไข
      const newParams = new URLSearchParams(searchParams);

      newParams.set('edit1', 'customer+info');
      router.push(`${pathname}?${newParams.toString()}`);
    } else {
      // นำ 'edit1' ออกจาก URL และแสดงผลลัพธ์เมื่อบันทึกข้อมูล
      const newParams = new URLSearchParams(searchParams);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/maintenances`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ maintenanceForm: maintenanceForm, maintenanceId: maintenanceId }),
        });

        if (response.ok) {
          Swal.fire({
            title: 'สำเร็จ!',
            text: 'คุณแก้ไขข้อมูล Customer สำเร็จ',
            icon: 'success',
            timer: 2000, // ปิดหลังจาก 2 วินาที
            timerProgressBar: true, // แสดง progress bar
            showConfirmButton: false, // ซ่อนปุ่มยืนยัน
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              newParams.delete('edit1');
              router.push(`${pathname}?${newParams.toString()}`);
            }
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while creating the ticket.',
            icon: 'error',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to connect to the API.',
          icon: 'error',
        });
      }
    }

    setIsEditing(!isEditing);
  };

  // ฟังก์ชันที่ใช้เมื่อเปลี่ยนข้อมูลลูกค้า
  const handleCustomerChange = (event: any, newValue: CustomerOption | null) => {

    if (newValue) {
      setmaintenanceForm({ ...maintenanceForm, ['customer']: newValue.value, ['name']: newValue.label });
    }
  };

  return (
    <Box>
      {/* Box ตรงกลางที่มีพื้นหลัง gradient สีฟ้า */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(45deg, #03a9f4, #0288d1)',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="body1" component="h2" color="white" sx={{ fontWeight: 'bold', fontSize: button === 'open' ? '24px' : '18px' }}>
          Customer Service Report
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ marginRight: 2, fontSize: button === 'open' ? '18px' : '12px' }}>
        Maintenance No. #{data.maintenance_no}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ marginRight: 2, fontSize: button === 'open' ? '18px' : '12px' }}>
          Customer:
        </Typography>
        {isEditing ? (
          <Autocomplete
            options={fetchCustomers}
            getOptionLabel={(option: CustomerOption) => option.label}
            onChange={handleCustomerChange}
            value={fetchCustomers.find(option => option.value === maintenanceForm.customer) || null}
            sx={{ width: 300, marginRight: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Customer" name='customer' variant="outlined" />
            )}
          />
        ) : (
          <Typography variant="body1" sx={{ marginRight: 2, fontSize: button === 'open' ? '18px' : '12px' }}>{maintenanceForm.name}</Typography>
        )}
        {button === 'open' && (
          <Button variant="outlined" sx={{ marginLeft: 2 }} onClick={handleEditClick}>
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        )}
      </Box>

      <Typography variant="body1" sx={{ fontSize: button === 'open' ? '18px' : '12px' }}>Date: {data.maintenance_create}</Typography>
      <Typography variant="body1" sx={{ fontSize: button === 'open' ? '18px' : '12px' }}>Address: {data.customer_address}</Typography>

      {/* Box ที่มีพื้นหลัง gradient สีส้ม */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(45deg, #ffcc80, #ff8c00)',
          height: '25px',
          marginTop: '12px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* เนื้อหาเพิ่มเติมสำหรับกล่องสีส้ม */}
      </Box>
    </Box>
  );
};

export default CustomerInfo;
