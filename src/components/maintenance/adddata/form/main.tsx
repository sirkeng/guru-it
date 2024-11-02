import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  customer: yup.string().required("Customer is required"),
});

type Props = {
  activeStep: number;
  handleNext: () => void;
  handlePrev: () => void;
  steps: { title: string; subtitle: string }[];
  formData: any;
  updateFormData: (data: any) => void;
};

type CustomerOption = {
  label: string;
  value: string;
};

const MaintenanceForm = ({ activeStep, handleNext, handlePrev, steps, formData, updateFormData }: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const [fetchCustomers, setFetchCustomers] = useState<CustomerOption[]>([]); // State to store customer options

  // ดึงข้อมูลจาก API เมื่อตอน component โหลด
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

  const onSubmit = (data: any) => {
    updateFormData(data);
    handleNext();
  };

  return (
    <React.Fragment>
      <h1>Form Maintenance</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={fetchCustomers}
                  getOptionLabel={(option: CustomerOption) => option.label}
                  onChange={(_, data) => field.onChange(data?.value || "")}
                  value={fetchCustomers.find(option => option.value === field.value) || null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Customer"
                      variant="outlined"
                      error={!!errors.customer}
                      helperText={errors.customer ? String(errors.customer.message) : ""}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="flex items-center justify-between">
              <Button
                variant="tonal"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handlePrev}
                startIcon={<Icon icon='tabler-arrow-left' />}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color={activeStep === steps.length - 1 ? 'success' : 'primary'}
                type="submit"
                endIcon={
                  activeStep === steps.length - 1 ? (
                    <Icon icon='tabler-check' />
                  ) : (
                    <Icon icon='tabler-arrow-right' />
                  )
                }
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default MaintenanceForm;
