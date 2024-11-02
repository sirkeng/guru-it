import React from "react";

import { Button, Checkbox, FormControlLabel, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  activeStep: number;
  handleNext: () => void;
  handlePrev: () => void;
  steps: { title: string; subtitle: string }[];
  formData: any;
  updateFormData: (data: any) => void;
};

type Item = {
  label: string;
  note: string;
};

const items: Item[] = [
  { label: "Firewall", note: "firewallNote" },
  { label: "Server", note: "serverNote" },
  { label: "Switch", note: "switchNote" },
  { label: "NAS", note: "nasNote" },
  { label: "UPS Server", note: "upsServerNote" },
  { label: "CCTV", note: "cctvNote" },
  { label: "Printers", note: "printersNote" },
  { label: "Router ISP", note: "routerIspNote" },
  { label: "Wireless AP", note: "wirelessApNote" }
];

const MaintenanceServerNetworkForm = ({ activeStep, handleNext, handlePrev, steps, formData, updateFormData }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: formData
  });

  const onSubmit = (data: any) => {
    console.log(data)
    updateFormData(data);
    handleNext();
  };

  return (
    <React.Fragment>
      <h1>Form Maintenance Server And Network</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Checked</TableCell>
                <TableCell>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.label}>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>
                    <Controller
                      name={item.label}
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={!!field.value} />}
                          label=""
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={item.note}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          fullWidth
                          value={field.value || ""}  // Ensure the input is always controlled
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={3} style={{ marginTop: '16px' }}>
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
                color={activeStep === steps.length - 1 ? "success" : "primary"}
                type="submit"
                endIcon={
                  activeStep === steps.length - 1 ? (
                    <Icon icon='tabler-check' />
                  ) : (
                    <Icon icon='tabler-arrow-right' />
                  )
                }
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

export default MaintenanceServerNetworkForm;
