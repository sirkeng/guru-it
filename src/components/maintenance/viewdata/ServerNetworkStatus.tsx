import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, TextField, Checkbox } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

import Swal from 'sweetalert2';

import type { ServerNetworkForm } from '@/types/maintenance';

interface ServerNetworkStatusProps {
  data: ServerNetworkForm;
  button: string;
  maintenanceId: string
}

const ServerNetworkStatus: FC<ServerNetworkStatusProps> = ({ data, button, maintenanceId }) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ServerNetworkForm>(data);

  useEffect(() => {
    setIsClient(true); // Ensure the component only renders on the client side
  }, []);

  const handleEditClick = async () => {
    if (!isEditing) {
      // Entering edit mode, add 'edit=ticket' to URL
      const newParams = new URLSearchParams(searchParams);

      newParams.set('edit2', 'maintenance+server+and+network');
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
          body: JSON.stringify({ serverNetworkForm: formData, maintenanceId: maintenanceId }),
        });

        if (response.ok) {
          Swal.fire({
            title: 'สำเร็จ!',
            text: 'คุณแก้ไขข้อมูล Maintenance Server And Network สำเร็จ',
            icon: 'success',
            timer: 2000, // Close after 3 seconds (3000 milliseconds)
            timerProgressBar: true, // Show a progress bar
            showConfirmButton: false, // Hide the confirm button
            customClass: {
              popup: 'swal2-front',
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              newParams.delete('edit2');
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

  const handleInputChange = (key: keyof ServerNetworkForm, value: boolean | string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // Determine how to split the items
  const keys = Object.keys(formData).filter(key => !key.includes('Note'));
  const leftItems = keys.slice(0, 4);  // First 4 items
  const rightItems = keys.slice(4);    // Remaining items

  return (
    <Box>
      <Table size="small">
        <TableHead>
          {/* First Row - Main Header */}
          <TableRow>
            <TableCell colSpan={6}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'primary.main',
                    textAlign: 'center',
                    fontSize: button === 'open' ? '22px' : '16px',
                    flexGrow: 1
                  }}
                >
                  MAINTENANCE SERVER AND NETWORK EQUIPMENTS
                </Typography>
                {button === 'open' && (
                  <Button
                    variant="outlined"
                    onClick={handleEditClick}
                    sx={{
                      position: 'absolute',
                      right: 0
                    }}
                  >
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                )}
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {/* Left Side - 4 items */}
            <TableCell colSpan={3} sx={{ verticalAlign: 'top', border: 0 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Hardware</TableCell>
                    <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Check</TableCell>
                    <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leftItems.map(key => (
                    <TableRow key={key}>
                      <TableCell>
                        <Typography variant="body1" sx={{ textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                          {key}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {isClient && isEditing ? (
                          <Checkbox
                            checked={formData[key as keyof ServerNetworkForm] as boolean}
                            onChange={(e) => handleInputChange(key as keyof ServerNetworkForm, e.target.checked)}
                          />
                        ) : (
                          <Typography variant="body1" sx={{ color: formData[key as keyof ServerNetworkForm] ? 'green' : 'red', fontSize: button === 'open' ? '16px' : '10px' }}>
                            {formData[key as keyof ServerNetworkForm] ? <Icon icon='mdi:check' /> : <Icon icon='fluent-mdl2:cancel' />}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={formData[`${key.toLowerCase()}Note` as keyof ServerNetworkForm] as string}
                            onChange={(e) => handleInputChange(`${key.toLowerCase()}Note` as keyof ServerNetworkForm, e.target.value)}
                          />
                        ) : (
                          <Typography variant="body1" sx={{ textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                            {formData[`${key.toLowerCase()}Note` as keyof ServerNetworkForm]}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>

            {/* Right Side - 5 items */}
            <TableCell colSpan={3} sx={{ verticalAlign: 'top', border: 0 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Hardware</TableCell>
                    <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Check</TableCell>
                    <TableCell sx={{ textAlign: 'center', fontSize: button === 'open' ? '18px' : '12px' }}>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rightItems.map(key => (
                    <TableRow key={key}>
                      <TableCell>
                        <Typography variant="body1" sx={{ textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                          {key}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {isClient && isEditing ? (
                          <Checkbox
                            checked={formData[key as keyof ServerNetworkForm] as boolean}
                            onChange={(e) => handleInputChange(key as keyof ServerNetworkForm, e.target.checked)}
                          />
                        ) : (
                          <Typography variant="body1" sx={{ color: formData[key as keyof ServerNetworkForm] ? 'green' : 'red', fontSize: button === 'open' ? '16px' : '10px' }}>
                            {formData[key as keyof ServerNetworkForm] ? <Icon icon='mdi:check' /> : <Icon icon='fluent-mdl2:cancel' />}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={formData[`${key.toLowerCase()}Note` as keyof ServerNetworkForm] as string}
                            onChange={(e) => handleInputChange(`${key.toLowerCase()}Note` as keyof ServerNetworkForm, e.target.value)}
                          />
                        ) : (
                          <Typography variant="body1" sx={{ textAlign: 'center', fontSize: button === 'open' ? '16px' : '10px' }}>
                            {formData[`${key.toLowerCase()}Note` as keyof ServerNetworkForm]}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default ServerNetworkStatus;
