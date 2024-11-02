import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import Swal from 'sweetalert2';

interface AddEngineerDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddEngineerDialog: React.FC<AddEngineerDialogProps> = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const handleSubmit = async () => {
    // Create a FormData object
    const formData = new FormData();

    formData.append('userFirstname', firstName);
    formData.append('userLastname', lastName);
    formData.append('userEmail', email);
    formData.append('userPhone', phone);
    formData.append('userJobtitle', jobTitle);

    try {
      // Send the formData to the API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/engineers`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Successful response handling
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'คุณเพิ่มลูกค้าสำเร็จ.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            onClose(); // Close the modal after the Swal popup closes
          }
        });
        onClose();
      } else {
        // Error handling if the response was not successful
        const errorData = await response.json();

        Swal.fire({
          title: 'Error!',
          text: `Failed to add engineer: ${errorData.message}`,
          icon: 'error',
        });
      }
    } catch (error) {
      // Network or other unexpected error handling
      Swal.fire({
        title: 'Error!',
        text: 'Failed to connect to the API.',
        icon: 'error',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Engineer</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone"
          type="tel"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Job Title"
          type="text"
          fullWidth
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Engineer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEngineerDialog;
