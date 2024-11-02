'use client';
import React, { useEffect, useState } from 'react';

import { Card, CardContent, StepLabel, Stepper, styled, Typography } from '@mui/material';
import MuiStep from '@mui/material/Step';
import classnames from 'classnames';
import Swal from 'sweetalert2';

import { useSession } from 'next-auth/react';

import StepperWrapper from '@/@core/styles/stepper';
import CustomAvatar from '@/@core/components/mui/Avatar';
import MaintenanceForm from '@/components/maintenance/adddata/form/main';
import MaintenanceServerNetworkForm from '@/components/maintenance/adddata/form/msn';
import ITMaintenanceForm from '@/components/maintenance/adddata/form/itmain';
import PreviewMaintenanceForm from '@/components/maintenance/adddata/form/previewmain';

// Vars
const steps = [
  { icon: 'tabler-users', title: 'Maintenance Report', subtitle: 'Choose Customer Service Report' },
  { icon: 'tabler-id', title: 'Maintenance Server And Network', subtitle: 'Setup Server And Network' },
  { icon: 'tabler-credit-card', title: 'IT Maintenance', subtitle: 'Add IT Maintenance' },
  { icon: 'tabler-checkbox', subtitle: 'Preview Data Maintenance', title: 'Preview & Complete' },
];

const Step = styled(MuiStep)(({ theme }) => ({
  '&.Mui-completed .step-title, &.Mui-completed .step-subtitle': {
    color: theme.palette.text.disabled,
  },
}));

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const { data: session } = useSession()

  // State to hold the form data
  const [formData, setFormData] = useState({
    maintenanceForm: {
      user_id: '',
      customer: '',
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      address: '',
    },
    serverNetworkForm: {
      Firewall: false,
      Server: false,
      Switch: false,
      NAS: false,
      'UPS Server': false,
      CCTV: false,
      Printers: false,
      'Router ISP': false,
      'Wireless AP': false,
      firewallNote: '',
      serverNote: '',
      switchNote: '',
      nasNote: '',
      upsServerNote: '',
      cctvNote: '',
      printersNote: '',
      routerIspNote: '',
      wirelessApNote: '',
    },
    itMaintenanceForm: {
      maintenanceItems: [{ name: '', diskClean: false, windowUpdate: false, driverUpdate: false, virusScan: false, note: '' }],
    },
  });

  useEffect(() => {
    if (session?.user_account?.user_id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        maintenanceForm: {
          ...prevFormData.maintenanceForm,
          user_id: session.user_account.user_id, // อัปเดต user_id ให้ถูกต้อง
        },
      }));
    }
  }, [session?.user_account?.user_id]);


  console.log(formData)

  // Function to submit the form to the backend API
  const submitForm = async () => {

    // ตรวจสอบอีกครั้งหลังจากอัปเดตแล้ว
    if (!formData.maintenanceForm.user_id) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่พบ User ID, โปรดตรวจสอบข้อมูลผู้ใช้งาน',
        icon: 'error',
      });

      return; // หยุดการทำงานถ้าไม่มี user_id
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/maintenances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'คุณสร้าง Form Maintenance สำเร็จ',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'ไม่สามารถบันทึกข้อมูลได้',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
        icon: 'error',
      });
    }
  };


  const handleNext = () => {
    // ตรวจสอบว่ามี user_id อยู่ใน formData หรือไม่ ถ้าไม่มีให้เพิ่มจาก session
    if (!formData.maintenanceForm.user_id && session?.user_account?.user_id) {
      setFormData((prevData) => ({
        ...prevData,
        maintenanceForm: {
          ...prevData.maintenanceForm,
          user_id: session.user_account.user_id,  // เพิ่ม user_id จาก session
        },
      }));

      if (formData.maintenanceForm.user_id) {

      }
    }

    if (activeStep !== steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      submitForm();
    }
  };

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const updateFormData = (stepKey: keyof typeof formData, stepData: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [stepKey]: {
        ...prevData[stepKey],  // รักษาค่าที่มีอยู่ เช่น user_id
        ...stepData,  // อัปเดตข้อมูลใหม่ที่ถูกส่งมา
      },
    }));
  };

  const getStepContent = (step: number) => {
    const commonProps = {
      activeStep,
      handleNext,
      handlePrev,
      steps,
    };

    switch (step) {
      case 0:
        return <MaintenanceForm {...commonProps} formData={formData.maintenanceForm} updateFormData={(data) => updateFormData('maintenanceForm', data)} />;
      case 1:
        return <MaintenanceServerNetworkForm {...commonProps} formData={formData.serverNetworkForm} updateFormData={(data) => updateFormData('serverNetworkForm', data)} />;
      case 2:
        return <ITMaintenanceForm {...commonProps} formData={formData.itMaintenanceForm} updateFormData={(data) => updateFormData('itMaintenanceForm', data)} />;
      case 3:
        return <PreviewMaintenanceForm {...commonProps} formData={formData} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Card className="flex flex-col md:flex-row">
      <CardContent className="max-md:border-be md:border-ie md:min-is-[300px]">
        <StepperWrapper>
          <Stepper activeStep={activeStep} orientation="vertical" connector={<></>} className="flex flex-col gap-4 min-is-[220px]">
            {steps.map((label, index) => (
              <Step key={index} onClick={() => setActiveStep(index)}>
                <StepLabel icon={<></>} className="p-1 cursor-pointer">
                  <div className="step-label">
                    <CustomAvatar
                      variant="rounded"
                      skin={activeStep === index ? 'filled' : 'light'}
                      {...(activeStep >= index && { color: 'primary' })}
                      {...(activeStep === index && { className: 'shadow-primarySm' })}
                      size={38}
                    >
                      <i className={classnames(label.icon as string, '!text-[22px]')} />
                    </CustomAvatar>
                    <div className="flex flex-col">
                      <Typography color="text.primary" className="step-title">
                        {label.title}
                      </Typography>
                      <Typography className="step-subtitle">{label.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <CardContent className="flex-1 pbs-6">{getStepContent(activeStep)}</CardContent>
    </Card>
  );
}
