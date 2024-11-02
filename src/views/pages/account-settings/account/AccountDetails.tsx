'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

import { Grid, Card, CardContent, Button, Typography } from '@mui/material';

import Swal from 'sweetalert2';

import CustomTextField from '@core/components/mui/TextField';

type Data = {
  user_id: string;
  user_no: string;
  user_firstname: string;
  user_lastname: string;
  user_email: string;
  user_phone: number | string;
  user_img: string
};

interface AccountDetailsProps {
  userDataAPI: Data;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ userDataAPI }) => {
  const [userFirstname, setUserFirstname] = useState<string>(userDataAPI.user_firstname);
  const [userLastname, setUserLastname] = useState<string>(userDataAPI.user_lastname);
  const [userEmail, setUserEmail] = useState<string>(userDataAPI.user_email);
  const [userPhone, setUserPhone] = useState<number | string>(userDataAPI.user_phone);
  const [userImg, setUserImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(userDataAPI?.user_img ? `${process.env.NEXT_PUBLIC_API_URL}/upload/engineers/${userDataAPI?.user_no}/${userDataAPI?.user_img}` : '/images/avatars/1.png');

  // ฟังก์ชัน handleFileInputChange สำหรับเลือกไฟล์
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setUserImg(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileInputReset = () => {
    setUserImg(null);
    setImagePreview(userDataAPI?.user_img ? `${process.env.NEXT_PUBLIC_API_URL}/upload/engineers/${userDataAPI?.user_no}/${userDataAPI?.user_img}` : '/images/avatars/1.png');
  };

  // ฟังก์ชัน handleSubmit สำหรับส่งข้อมูลไปยัง API
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    formData.append('userId', userDataAPI.user_id)
    formData.append('userFirstname', userFirstname);
    formData.append('userLastname', userLastname);
    formData.append('userEmail', userEmail);
    formData.append('userPhone', userPhone.toString());

    if (userImg) {
      formData.append('userImg', userImg);
    }

    // ส่งข้อมูลไปที่ API
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/engineers`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {

        Swal.fire({
          title: 'สำเร็จ!',
          text: 'คุณแก้ไขข้อมูลของตัวเองสำเร็จ.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
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
  };

  return (
    <Card>
      <CardContent className="mbe-4">
        <div className="flex max-sm:flex-col items-center gap-6">
          <img height={100} width={100} className="rounded" src={imagePreview} alt="Profile" />
          <div className="flex flex-grow flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button component="label" variant="contained" htmlFor="account-settings-upload-image">
                Upload New Photo
                <input
                  hidden
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileInputChange}
                  id="account-settings-upload-image"
                />
              </Button>
              <Button variant="tonal" color="secondary" onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="First Name"
                value={userFirstname}
                placeholder="John"
                onChange={(e) => setUserFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Last Name"
                value={userLastname}
                placeholder="Doe"
                onChange={(e) => setUserLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Email"
                value={userEmail}
                placeholder="john.doe@gmail.com"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Phone Number"
                value={userPhone}
                placeholder="+1 (234) 567-8901"
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className="flex gap-4 flex-wrap">
              <Button variant="contained" type="submit">
                Save Changes
              </Button>
              <Button
                variant="tonal"
                type="reset"
                color="secondary"
                onClick={() => {
                  // Reset fields to the original values from userDataAPI
                  setUserFirstname(userDataAPI.user_firstname);
                  setUserLastname(userDataAPI.user_lastname);
                  setUserEmail(userDataAPI.user_email);
                  setUserPhone(userDataAPI.user_phone);
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
