import React from "react";

import { Button, Checkbox, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react/dist/iconify.js";

// Define the validation schema using yup
const schema = yup.object().shape({
  maintenanceItems: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Name is required"),
      diskClean: yup.boolean(),
      windowUpdate: yup.boolean(),
      driverUpdate: yup.boolean(),
      virusScan: yup.boolean(),
      note: yup.string(),
    })
  )
});

type Props = {
  activeStep: number;
  handleNext: () => void;
  handlePrev: () => void;
  steps: { title: string; subtitle: string }[];
  formData: any;
  updateFormData: (data: any) => void;
};

const ITMaintenanceForm = ({ activeStep, handleNext, handlePrev, steps, formData, updateFormData }: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData // Initialize with existing data
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "maintenanceItems"
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    handleNext();
  };

  return (
    <React.Fragment>
      <h1>Form IT Maintenance</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ลำดับ</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Disk Clean</TableCell>
                <TableCell>Window Update</TableCell>
                <TableCell>Driver Update</TableCell>
                <TableCell>Virus Scan</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Controller
                      name={`maintenanceItems.${index}.name`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          fullWidth
                          error={!!(errors.maintenanceItems as any)?.[index]?.name}
                          helperText={(errors.maintenanceItems as any)?.[index]?.name?.message || ""}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`maintenanceItems.${index}.diskClean`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={!!field.value} />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`maintenanceItems.${index}.windowUpdate`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={!!field.value} />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`maintenanceItems.${index}.driverUpdate`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={!!field.value} />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`maintenanceItems.${index}.virusScan`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={!!field.value} />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`maintenanceItems.${index}.note`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    {index > 0 && (
                      <IconButton onClick={() => remove(index)}>
                        <Icon icon='material-symbols:delete' />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={3} style={{ marginTop: '16px' }}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={() => append({ name: "", diskClean: false, windowUpdate: false, driverUpdate: false, virusScan: false, note: "" })}
            >
              Add Row
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div className="flex items-center justify-between">
              <Button
                variant="tonal"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handlePrev}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color={activeStep === steps.length - 1 ? "success" : "primary"}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default ITMaintenanceForm;
