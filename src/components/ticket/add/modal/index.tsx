import React, { useState } from 'react';

import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Swal from 'sweetalert2';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (data: { ticketTitle: string; ticketDescription: string; ticketFile: File | null }) => void;
};

type CustomerOption = {
  label: string;
  value: number;
};

const TicketModal: React.FC<ModalProps> = ({ isOpen, closeModal, onSubmit }) => {
  const [ticketCustomer, setTicketCustomer] = useState<number | null>()
  const [ticketTitle, setTicketTitle] = useState<string>('');
  const [ticketDescription, setTicketDescription] = useState<string>('');
  const [ticketFile, setTicketFile] = useState<File | null>(null);

  const fetchCustomers: CustomerOption[] = [
    { label: "John Doe - ACME Corp", value: 1 },
    { label: "Jane Smith - Global Industries", value: 2 },

    // Add more customer data here
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTicketFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('ticketCustomer', String(ticketCustomer));
    formData.append('ticketTitle', ticketTitle);
    formData.append('ticketDescription', ticketDescription);

    if (ticketFile) {
      formData.append('ticketFile', ticketFile);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onSubmit({ ticketTitle, ticketDescription, ticketFile });
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'คุณสร้าง Form Ticket สำเร็จ.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            closeModal(); // Close the modal after the Swal2 popup closes
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
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        keepMounted
        aria-labelledby="alert-dialog-slide-ticketTitle"
        aria-describedby="alert-dialog-slide-ticketDescription"
      >
        <DialogTitle id="alert-dialog-slide-ticketTitle">Create New Ticket</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={fetchCustomers}
            getOptionLabel={(option: CustomerOption) => option.label}
            onChange={(_, data) => setTicketCustomer(data?.value || null)}
            value={fetchCustomers.find(option => option.value === ticketCustomer) || null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Customer"
                variant="outlined"
              />
            )}
          />
          <TextField
            autoFocus
            margin="dense"
            id="ticket-Title"
            label="Ticket Title"
            type="text"
            fullWidth
            value={ticketTitle}
            onChange={(e) => setTicketTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="ticket-Description"
            label="Ticket Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={ticketDescription}
            onChange={(e) => setTicketDescription(e.target.value)}
          />
          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Create Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TicketModal;
