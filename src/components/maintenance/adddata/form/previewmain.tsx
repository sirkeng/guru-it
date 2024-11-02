import React from 'react';

import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {
  activeStep: number;
  handleNext: () => void;
  handlePrev: () => void;
  steps: { title: string; subtitle: string }[];
  formData: any;
};

const PreviewMaintenanceForm = ({ handleNext, handlePrev, formData }: Props) => {
  return (
    <React.Fragment>
      <h1>Preview Maintenance Form</h1>

      <Grid container spacing={3}>
        {/* Maintenance Form Data */}
        <Grid item xs={12}>
          <Typography variant="h6">Maintenance Form</Typography>
          <Typography>Date: {formData.maintenanceForm?.date || 'No customer information provided'}</Typography>
          <Typography>Customer: {formData.maintenanceForm?.customer || 'No customer information provided'}</Typography>
          <Typography>Customer Address: {formData.maintenanceForm?.address || 'No customer information provided'}</Typography>
        </Grid>

        {/* Server Network Form Data */}
        <Grid item xs={5}>
          <Typography variant="h6">Maintenance Server & Network</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Hardware</TableCell>
                  <TableCell>Check</TableCell>
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.serverNetworkForm ? (
                  Object.entries(formData.serverNetworkForm).map(([key, value]) => {
                    // Skip note keys to avoid displaying them as hardware
                    if (key.toLowerCase().includes('note')) return null;

                    // Find the corresponding note key (e.g., firewallNote for Firewall)
                    const noteKey = `${key.toLowerCase()}Note`;
                    const noteValue = formData.serverNetworkForm[noteKey];

                    return (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ color: value ? 'green' : 'red' }}>
                            {value ? <Icon icon='mdi:check' /> : <Icon icon='fluent-mdl2:cancel' />}
                          </Typography>
                        </TableCell>
                        <TableCell>{noteValue}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography>No server and network information provided</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* IT Maintenance Form Data */}
        <Grid item xs={7}>
          <Typography variant="h6">IT Maintenance</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Disk Clean</TableCell>
                  <TableCell>Window Update</TableCell>
                  <TableCell>Driver Update</TableCell>
                  <TableCell>Virus Scan</TableCell>
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.itMaintenanceForm?.maintenanceItems?.length ? (
                  formData.itMaintenanceForm.maintenanceItems.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}:</TableCell>
                      <TableCell>{item.name || 'No name provided'}</TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ color: item.diskClean ? 'green' : 'red' }}>
                          {item.diskClean ? <Icon icon='mdi:check' /> : <Icon icon='fluent-mdl2:cancel' />}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ color: item.windowUpdate ? 'green' : 'red' }}>
                          {item.windowUpdate ? <Icon icon='mdi:check' /> : <Icon icon='fluent-mdl2:cancel' />}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ color: item.driverUpdate ? 'green' : 'red' }}>
                          {item.driverUpdate ? <Icon icon='mdi:check' /> : <Icon icon='fluent-mdl2:cancel' />}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ color: item.virusScan ? 'green' : 'red' }}>
                          {item.virusScan ? <Icon icon='mdi:check' /> : <Icon icon='fluent-mdl2:cancel' />}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.note || 'No note provided'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Typography>No IT maintenance items provided</Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Navigation Buttons */}
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={handlePrev}>
            Previous
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext} style={{ marginLeft: '10px' }}>
            Confirm & Submit
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PreviewMaintenanceForm;
