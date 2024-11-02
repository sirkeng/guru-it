import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';

interface TicketButtonsProps {
  status: number;
}

const TabAction: React.FC<TicketButtonsProps> = ({ status }) => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleOpenDialog = (type: string) => {
    setOpenDialog(type);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleAcceptTicket = async () => {

    const formData = new FormData();

    formData.append('ticketEngineer', String(1));
    formData.append('ticketId', String(1));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/accept`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'คุณรับงาน Ticket ชิ้นนี้',
          icon: 'success',
          timer: 2000, // Close after 3 seconds (3000 milliseconds)
          timerProgressBar: true, // Show a progress bar
          showConfirmButton: false, // Hide the confirm button
          customClass: {
            popup: 'swal2-front',
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            handleCloseDialog(); // Close the modal after the Swal2 popup closes
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

  };

  const handleCompleteTicket = async () => {
    const formData = new FormData();

    formData.append('ticketId', String(1));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/complete`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        // Implement complete ticket logic here
        Swal.fire({
          title: 'ยินดีด้วย!',
          text: 'คุณแก้ไขงาน Ticket ชิ้นนี้ได้สำเร็จ',
          icon: 'success',
          timer: 2000, // Close after 3 seconds (3000 milliseconds)
          timerProgressBar: true, // Show a progress bar
          showConfirmButton: false, // Hide the confirm button
          customClass: {
            popup: 'swal2-front',
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Ticket Completed');
            handleCloseDialog(); // Close the modal after the Swal2 popup closes
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
  };

  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <Button
        variant={status === 0 ? 'contained' : 'outlined'}
        color={status > 0 ? 'success' : 'primary'}
        startIcon={
          status < 0 ? (
            <Icon icon="material-symbols:circle-outline" />
          ) : status === 0 ? (
            <Icon icon="mingcute:add-circle-fill" />
          ) : (
            <Icon icon="mdi:check-circle" />
          )
        }
        disabled={status !== 0}
        onClick={() => handleOpenDialog('accept')}
      >
        Accept Ticket
      </Button>
      <Button
        variant={status === 1 ? 'contained' : 'outlined'}
        color={status > 1 ? 'success' : 'primary'}
        startIcon={
          status < 1 ? (
            <Icon icon="material-symbols:circle-outline" />
          ) : status === 1 ? (
            <Icon icon="mingcute:add-circle-fill" />
          ) : (
            <Icon icon="mdi:check-circle" />
          )
        }
        disabled={status !== 1}
        onClick={() => handleOpenDialog('complete')}
      >
        Complete Ticket
      </Button>
      <Button
        variant={status === 2 ? 'contained' : 'outlined'}
        color="primary"
        startIcon={
          status < 2 ? (
            <Icon icon="material-symbols:circle-outline" />
          ) : status === 2 ? (
            <Icon icon="mingcute:add-circle-fill" />
          ) : (
            <Icon icon="mdi:check-circle" />
          )
        }
        disabled={status !== 2}
      >
        Print Ticket
      </Button>

      {/* Accept Ticket Dialog */}

      <Dialog
        open={openDialog === 'accept'}
        onClose={handleCloseDialog}
      >
        <DialogTitle>รับงาน Ticket ชิ้นนี้</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณต้องการรับงาน Ticket ชิ้นนี้หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={handleAcceptTicket} color="primary">
            ยอมรับ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Complete Ticket Dialog */}
      <Dialog
        open={openDialog === 'complete'}
        onClose={handleCloseDialog}
      >
        <DialogTitle>ปิดงาน Ticket ชิ้นนี้</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณต้องการปิดงาน Ticket ชิ้นนี้หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={handleCompleteTicket} color="primary">
            ปิดงาน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TabAction;
