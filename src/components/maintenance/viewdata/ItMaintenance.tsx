import type { FC } from 'react';
import { useState, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, IconButton, TextField, Checkbox } from '@mui/material';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

interface MaintenanceItem {
  name: string;
  diskClean: boolean;
  windowUpdate: boolean;
  driverUpdate: boolean;
  virusScan: boolean;
  note: string;
}

interface ItMaintenanceForm {
  maintenanceItems: MaintenanceItem[];
}

interface ItMaintenanceProps {
  data: ItMaintenanceForm;
  button: string;
  maintenanceId: string;
}

const ItMaintenanceTable: FC<ItMaintenanceProps> = ({ data, button, maintenanceId }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Initialize the form state with the given data
  const [itMaintenanceForm, setItMaintenanceForm] = useState<ItMaintenanceForm>(data);
  const [isEditing, setIsEditing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure component only renders on the client side
  }, []);

  const handleEditClick = async () => {
    if (!isEditing) {
      // Entering edit mode, add 'edit=ticket' to URL
      const newParams = new URLSearchParams(searchParams);

      newParams.set('edit3', 'it+maintenance');
      router.push(`${pathname}?${newParams.toString()}`);
    } else {
      // Exiting edit mode, remove 'edit' from URL
      const newParams = new URLSearchParams(searchParams);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/maintenances`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itMaintenanceForm: itMaintenanceForm, maintenanceId: maintenanceId }),
        });

        if (response.ok) {
          Swal.fire({
            title: 'สำเร็จ!',
            text: 'คุณแก้ไขข้อมูล It Maintenance สำเร็จ',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
              popup: 'swal2-front',
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log(itMaintenanceForm);
              newParams.delete('edit3');
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

  const handleAddRow = () => {
    if (itMaintenanceForm.maintenanceItems.length < 10) {
      setItMaintenanceForm({
        ...itMaintenanceForm,
        maintenanceItems: [
          ...itMaintenanceForm.maintenanceItems,
          { name: '', diskClean: false, windowUpdate: false, driverUpdate: false, virusScan: false, note: '' },
        ],
      });
    }
  };

  const handleDeleteRow = (index: number) => {
    setItMaintenanceForm({
      ...itMaintenanceForm,
      maintenanceItems: itMaintenanceForm.maintenanceItems.filter((_, i) => i !== index),
    });
  };

  const handleInputChange = (index: number, field: keyof MaintenanceItem, value: string | boolean) => {
    const newItems = [...itMaintenanceForm.maintenanceItems];

    newItems[index][field] = value as never;
    setItMaintenanceForm({ ...itMaintenanceForm, maintenanceItems: newItems });
  };

  return (
    <Box>
      <Table size="small">
        <TableHead>
          {/* First Row - Main Header */}
          <TableRow>
            <TableCell colSpan={7}>
              <Box sx={{ display: 'flex', justifyContent: button === 'open' ? 'space-between' : 'center', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: 'primary.main', textAlign: 'center', fontSize: button === 'open' ? '22px' : '16px' }}>
                  IT MAINTENANCE (USERS COMPUTER)
                </Typography>
                {button === 'open' ? (
                  <Button variant="outlined" onClick={handleEditClick}>
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                ) : null}
              </Box>
            </TableCell>
          </TableRow>
          {/* Second Row - Sub Headers */}
          <TableRow>
            <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>#</TableCell>
            <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Name</TableCell>
            <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Disk Clean</TableCell>
            <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Windows Update</TableCell>
            <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Driver Update</TableCell>
            <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Virus Scan</TableCell>
            <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Note</TableCell>
            {isEditing && <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {itMaintenanceForm.maintenanceItems.map((item, index) => (
            <TableRow key={index}>
              {isClient && (
                <>
                  <TableCell sx={{ textAlign: 'center', fontSize: '10px' }}>{index + 1}</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        value={item.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      />
                    ) : (
                      <Typography variant="body1" sx={{ textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                        {item.name}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {isEditing ? (
                      <Checkbox
                        checked={item.diskClean}
                        onChange={(e) => handleInputChange(index, 'diskClean', e.target.checked)}
                        color="primary"
                      />
                    ) : (
                      <Typography variant="body1" sx={{ color: item.diskClean ? 'green' : 'red', textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                        {item.diskClean ? <Icon icon="mdi:check" /> : <Icon icon="fluent-mdl2:cancel" />}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {isEditing ? (
                      <Checkbox
                        checked={item.windowUpdate}
                        onChange={(e) => handleInputChange(index, 'windowUpdate', e.target.checked)}
                        color="primary"
                      />
                    ) : (
                      <Typography variant="body1" sx={{ color: item.windowUpdate ? 'green' : 'red', textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                        {item.windowUpdate ? <Icon icon="mdi:check" /> : <Icon icon="fluent-mdl2:cancel" />}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {isEditing ? (
                      <Checkbox
                        checked={item.driverUpdate}
                        onChange={(e) => handleInputChange(index, 'driverUpdate', e.target.checked)}
                        color="primary"
                      />
                    ) : (
                      <Typography variant="body1" sx={{ color: item.driverUpdate ? 'green' : 'red', textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                        {item.driverUpdate ? <Icon icon="mdi:check" /> : <Icon icon="fluent-mdl2:cancel" />}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {isEditing ? (
                      <Checkbox
                        checked={item.virusScan}
                        onChange={(e) => handleInputChange(index, 'virusScan', e.target.checked)}
                        color="primary"
                      />
                    ) : (
                      <Typography variant="body1" sx={{ color: item.virusScan ? 'green' : 'red', textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                        {item.virusScan ? <Icon icon="mdi:check" /> : <Icon icon="fluent-mdl2:cancel" />}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        value={item.note}
                        onChange={(e) => handleInputChange(index, 'note', e.target.value)}
                      />
                    ) : (
                      <Typography variant="body1" sx={{ textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                        {item.note}
                      </Typography>
                    )}
                  </TableCell>
                  {isEditing && (
                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton onClick={() => handleDeleteRow(index)}>
                        <Icon icon="mdi:trash" />
                      </IconButton>
                    </TableCell>
                  )}
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isEditing && itMaintenanceForm.maintenanceItems.length < 10 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAddRow}>
            Add Row
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ItMaintenanceTable;
