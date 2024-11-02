'use client';
import React, { useEffect, useState } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { Avatar, Box, Button, Chip, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

import TabAction from '@/components/ticket/viewdata/tab/tabAction';
import TicketTimeline from '@/components/ticket/viewdata/timeline/ticketTimeline';
import { getStatusColor, getStatusText } from '@/utils/status';

export default function Page() {
  const [ticketDetails, setTicketDetails] = useState<any>(null); // State to hold ticket data from API
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // ดึงค่า ticket_no จาก query parameters
  const ticket_no = searchParams.get('ticket_no');

  // ดึงข้อมูลจาก API ตาม ticket_no เมื่อหน้าโหลด
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/byNo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ putTicket: ticket_no }), // ส่ง putTicket = ticket_no
        });

        const data = await response.json();

        if (response.ok) {
          setTicketDetails(data); // เก็บข้อมูล ticket ใน state
          setEditedTitle(data.ticket_title);
          setEditedDescription(data.ticket_detail);
        } else {
          console.error('Error fetching ticket data:', data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    if (ticket_no) {
      fetchTicketData(); // เรียก API เฉพาะเมื่อมี ticket_no
    }
  }, [ticket_no]);

  // Handle edit toggle
  const handleEditToggle = () => {
    if (!isEditing) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('edit', 'ticket');
      router.push(`${pathname}?${newParams.toString()}`);
    } else {
      const newParams = new URLSearchParams(searchParams);

      newParams.delete('edit');
      router.push(`${pathname}?${newParams.toString()}`);
    }

    setIsEditing((prev) => !prev);
  };

  const handleSaveChanges = async () => {
    try {
      // Sending the edited ticket data to the API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketTitle: editedTitle,
          ticketDescription: editedDescription,
          ticketId: ticketDetails.ticket_id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'คุณแก้ไขข้อมูลสำเร็จ',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            const newParams = new URLSearchParams(searchParams);

            newParams.delete('edit');
            router.push(`${pathname}?${newParams.toString()}`);
            setIsEditing(false);
          }
        });
      } else {
        console.error('Error updating ticket:', data);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(ticketDetails.ticket_title);
    setEditedDescription(ticketDetails.ticket_detail);

    const newParams = new URLSearchParams(searchParams);

    newParams.delete('edit');
    router.push(`${pathname}?${newParams.toString()}`);
    setIsEditing(false);
  };

  if (!ticketDetails) {
    return <div>Loading...</div>; // แสดงผล Loading ขณะกำลังดึงข้อมูล
  }

  const status = ticketDetails.ticket_status;

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h5" component="h2">
          Ticket No. #{ticketDetails.ticket_no}
        </Typography>
        <Chip variant='tonal' size="small" label={getStatusText(status)} color={getStatusColor(status)} />
      </Box>
      <Typography variant="body1" component="p">
        <strong>Created At:</strong> {ticketDetails.ticket_create}
      </Typography>
      <TabAction status={status} />

      <Box sx={{ marginY: '20px' }}>
        <Grid spacing={6} container>
          <Grid item md={8} xs={12}>
            <Paper elevation={3}>
              <Box sx={{ padding: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  {isEditing ? (
                    <TextField
                      variant="outlined"
                      label="Ticket Title"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      fullWidth
                    />
                  ) : (
                    <React.Fragment>
                      <Typography variant="h3" fontWeight="bold">
                        {ticketDetails.ticket_title}
                      </Typography>
                      {status === 0 && (
                        <IconButton onClick={handleEditToggle}>
                          <Icon icon="mdi:pencil" />
                        </IconButton>
                      )}
                    </React.Fragment>
                  )}
                </Box>

                {isEditing ? (
                  <TextField
                    variant="outlined"
                    label="Description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ marginTop: 2 }}
                  />
                ) : (
                  <Typography variant="body1" component="p" sx={{ marginTop: 2 }}>
                    <strong>Description:</strong> {ticketDetails.ticket_detail}
                  </Typography>
                )}

                {isEditing ? (
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 3 }}>
                    <input type="file" accept=".pdf,.docx,.txt" />
                    <Box>
                      <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ marginRight: 2 }}>
                        Save
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon icon="mdi:file-download" />}
                    onClick={() => console.log('Download Ticket')}
                    sx={{ marginTop: 3 }}
                  >
                    Download Ticket File
                  </Button>
                )}
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ marginTop: '20px' }}>
              <Box sx={{ padding: 4 }}>
                <Typography variant="h3">Timeline</Typography>
                <TicketTimeline ticketDetails={ticketDetails} status={status} />
              </Box>
            </Paper>
          </Grid>

          <Grid item md={4} xs={12}>
            <Paper elevation={3}>
              <Box sx={{ padding: 4 }}>
                <Typography variant="h3">Created By</Typography>
                <Box display="flex" alignItems="center" gap={2} mt={2}>
                  <Avatar
                    src={`${process.env.NEXT_PUBLIC_API_URL}/upload/customers/${ticketDetails.customer_no}/${ticketDetails.customer_img}`}
                    alt="Customer"
                    sx={{ width: 150, height: 150, borderRadius: 2 }}
                  />
                  <Box>
                    <Typography variant="body1" component="p">
                      <strong>Customer Name:</strong> {ticketDetails.customer_name}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <strong>Customer Address:</strong> {ticketDetails.customer_address}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {status > 0 && (
              <Paper elevation={3} sx={{ marginTop: '20px' }}>
                <Box sx={{ padding: 4 }}>
                  <Typography variant="h3">Accepted By</Typography>
                  <Box display="flex" alignItems="center" gap={2} mt={2}>
                    <Avatar
                      src={`${process.env.NEXT_PUBLIC_API_URL}/upload/customers/${ticketDetails.engineer_no}/${ticketDetails.engineer_img}`}
                      alt="Assignee"
                      sx={{ width: 150, height: 150, borderRadius: 2 }}
                    />
                    <Box>
                      <Typography variant="body1" component="p">
                        <strong>Name:</strong> {ticketDetails.user_firstname} {ticketDetails.user_lastname}
                      </Typography>
                      <Typography variant="body1" component="p">
                        <strong>Accepted At:</strong> {ticketDetails.ticket_accept}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
